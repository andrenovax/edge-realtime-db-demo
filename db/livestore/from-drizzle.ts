import { getColumns, type InferSelectModel } from "drizzle-orm";
import { getTableConfig, SQLiteColumn, type SQLiteTable } from "drizzle-orm/sqlite-core";
import { Schema, State } from "@livestore/livestore";

type SupportedDefault = string | number | boolean | null;

function isSupportedDefault(value: unknown): value is SupportedDefault {
  return value === null || ["string", "number", "boolean"].includes(typeof value);
}

function liveStoreIndexesFromDrizzle(table: SQLiteTable) {
  const { indexes, uniqueConstraints } = getTableConfig(table);
  const explicitIndexes = indexes.map(({ config }) => {
    if (config.where !== undefined) {
      throw new Error(`LiveStore does not support partial index ${config.name}`);
    }

    const columns = config.columns.map((column) => {
      if (!(column instanceof SQLiteColumn)) {
        throw new Error(`LiveStore does not support expression index ${config.name}`);
      }
      return column.name;
    });
    return { name: config.name, columns, isUnique: config.unique };
  });

  const compositeUniqueIndexes = uniqueConstraints.map((constraint) => ({
    name: constraint.getName(),
    columns: constraint.columns.map((column) => column.name),
    isUnique: true,
  }));

  return [...explicitIndexes, ...compositeUniqueIndexes];
}

// Drizzle v1's official effect-schema adapter requires Effect 4, while
// LiveStore 0.4 uses Effect 3. This narrow adapter keeps Drizzle authoritative
// without mixing incompatible Effect runtimes. Add a case here whenever a
// canonical row model gains a new SQLite type; unknown types fail at startup.
export function liveStoreModelFromDrizzle<const TTable extends SQLiteTable>(table: TTable) {
  const tableConfig = getTableConfig(table);
  const primaryKeys = new Set([
    ...tableConfig.columns.filter((column) => column.primary).map((column) => column.name),
    ...tableConfig.primaryKeys.flatMap((key) => key.columns.map((column) => column.name)),
  ]);
  const fields: Record<string, Schema.Schema.AnyNoContext> = {};

  for (const [property, column] of Object.entries(getColumns(table))) {
    if (column.name !== property) {
      throw new Error(
        `LiveStore cannot preserve Drizzle column alias ${tableConfig.name}.${property} -> ${column.name}`,
      );
    }

    let field: Schema.Schema.AnyNoContext;
    if (column.dataType.startsWith("string")) {
      field = Schema.String;
    } else if (column.dataType.startsWith("number")) {
      field = column.getSQLType() === "integer" ? Schema.Int : Schema.Number;
    } else if (column.dataType === "boolean") {
      field = Schema.Boolean;
    } else {
      throw new Error(
        `Unsupported Drizzle column type ${column.dataType} for ${tableConfig.name}.${property}`,
      );
    }

    if (!column.notNull) field = Schema.NullOr(field);
    if (primaryKeys.has(column.name)) field = field.pipe(State.SQLite.withPrimaryKey);
    if (column.isUnique) field = field.pipe(State.SQLite.withUnique);
    if (column.hasDefault) {
      if (!isSupportedDefault(column.default)) {
        throw new Error(`LiveStore requires a literal default for ${tableConfig.name}.${property}`);
      }
      field = field.pipe(State.SQLite.withDefault(column.default));
    }
    fields[property] = field;
  }

  const schema = Schema.Struct(fields) as unknown as Schema.Schema<InferSelectModel<TTable>>;
  return {
    schema,
    table: State.SQLite.table({
      name: tableConfig.name,
      schema,
      indexes: liveStoreIndexesFromDrizzle(table),
    }),
  };
}
