import { t as e } from "./rolldown-runtime-Dq54dT1u.js";
import { X as t, n, q as r, t as i } from "./adapter-CM7nAgvF.js";
import { b as a, c as o, i as s, n as c, o as l, t as u, y as d } from "./dist-DX_tDQru.js";
function capitalizeFirstLetter(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var f = e(() => {});
function getKyselyDatabaseType(e) {
  if (!e) return null;
  if (`dialect` in e) return getKyselyDatabaseType(e.dialect);
  if (`createDriver` in e) {
    if (e instanceof o) return `sqlite`;
    if (e instanceof l) return `mysql`;
    if (e instanceof s) return `postgres`;
    if (e instanceof c) return `mssql`;
  }
  return `aggregate` in e
    ? `sqlite`
    : `getConnection` in e
      ? `mysql`
      : `connect` in e
        ? `postgres`
        : `fileControl` in e ||
            (`open` in e && `close` in e && `prepare` in e) ||
            (`batch` in e && `exec` in e && `prepare` in e)
          ? `sqlite`
          : null;
}
function insensitiveIlike(e, t, n) {
  return n === `postgres` ? d`${d.ref(e)} ILIKE ${t}` : d`LOWER(${d.ref(e)}) LIKE LOWER(${t})`;
}
function insensitiveIn(e, t) {
  return { lhs: d`LOWER(${d.ref(e)})`, values: t.map((e) => e.toLowerCase()) };
}
function insensitiveNotIn(e, t) {
  return { lhs: d`LOWER(${d.ref(e)})`, values: t.map((e) => e.toLowerCase()) };
}
function insensitiveEq(e, t) {
  return { lhs: d`LOWER(${d.ref(e)})`, value: t.toLowerCase() };
}
function insensitiveNe(e, t) {
  return { lhs: d`LOWER(${d.ref(e)})`, value: t.toLowerCase() };
}
var createKyselyAdapter,
  kyselyAdapter,
  p = e(() => {
    (u(),
      i(),
      r(),
      f(),
      (createKyselyAdapter = async (e) => {
        let t = e.database;
        if (!t) return { kysely: null, databaseType: null, transaction: void 0 };
        if (`db` in t) return { kysely: t.db, databaseType: t.type, transaction: t.transaction };
        if (`dialect` in t)
          return {
            kysely: new a({ dialect: t.dialect }),
            databaseType: t.type,
            transaction: t.transaction,
          };
        let n,
          r = getKyselyDatabaseType(t);
        if (
          (`createDriver` in t && (n = t),
          `aggregate` in t && !(`createSession` in t) && (n = new o({ database: t })),
          `getConnection` in t && (n = new l(t)),
          `connect` in t && (n = new s({ pool: t })),
          `fileControl` in t)
        ) {
          let { BunSqliteDialect: e } = await import(`./bun-sqlite-dialect-DTyyejk1-DszIFOY_.js`);
          n = new e({ database: t });
        }
        if (`createSession` in t) {
          let e;
          try {
            ({ DatabaseSync: e } = await import(`node:sqlite`));
          } catch (e) {
            if (typeof e == `object` && e && `code` in e && e.code !== `ERR_UNKNOWN_BUILTIN_MODULE`)
              throw e;
          }
          if (e && t instanceof e) {
            let { NodeSqliteDialect: e } = await import(`./node-sqlite-dialect-DMUjqPGR.js`);
            n = new e({ database: t });
          }
        }
        if (`batch` in t && `exec` in t && `prepare` in t) {
          let { D1SqliteDialect: e } = await import(`./d1-sqlite-dialect-CDCl_qH4-utaVzg4b.js`);
          n = new e({ database: t });
        }
        return { kysely: n ? new a({ dialect: n }) : null, databaseType: r, transaction: void 0 };
      }),
      (kyselyAdapter = (e, r) => {
        let i = null,
          a = !1,
          createCustomAdapter =
            (e, n = !1) =>
            ({
              getFieldName: i,
              schema: o,
              getDefaultFieldName: s,
              getDefaultModelName: c,
              getFieldAttributes: l,
              getModelName: u,
              options: f,
            }) => {
              r?.type === `mysql` &&
                f.advanced?.database?.generateId === !1 &&
                !a &&
                ((a = !0),
                t.warn(
                  `[Kysely Adapter] MySQL does not support INSERT...RETURNING. With generateId set to false, the adapter uses best-effort fallback strategies (unique columns, full-field match) to retrieve inserted rows. For reliable behavior, use Better Auth's default ID generation, a custom generateId function, or generateId: "serial" for auto-increment.`,
                ));
              let selectAllJoins = (e) => {
                  let t = [],
                    n = [];
                  if (e)
                    for (let [r, i] of Object.entries(e)) {
                      let e = o[c(r)]?.fields,
                        [i, a] = r.includes(`.`) ? r.split(`.`) : [void 0, r];
                      if (e) {
                        e.id = { type: `string` };
                        for (let [i, o] of Object.entries(e))
                          (t.push(
                            d`${d.ref(`join_${a}`)}.${d.ref(o.fieldName || i)} as ${d.ref(`_joined_${a}_${o.fieldName || i}`)}`,
                          ),
                            n.push({ joinModel: r, joinModelRef: a, fieldName: o.fieldName || i }));
                      }
                    }
                  return { allSelectsStr: n, allSelects: t };
                },
                withReturning = async (a, s, l, u) => {
                  if (r?.type === `mysql`) {
                    if (u.length > 0) {
                      let t = await s.executeTakeFirst();
                      if (!t || Number(t.numUpdatedRows ?? 0) === 0) return null;
                      let n = u.find(
                          (e) =>
                            e.field === `id` &&
                            (e.operator === void 0 || e.operator === `eq`) &&
                            e.connector !== `OR` &&
                            e.value !== void 0 &&
                            e.value !== null,
                        ),
                        r,
                        o;
                      if (a.id !== void 0 && a.id !== null) ((r = `id`), (o = a.id));
                      else if (n) ((r = `id`), (o = n.value));
                      else if (u[0]?.field)
                        ((r = u[0].field), (o = a[r] === void 0 ? u[0].value : a[r]));
                      else return null;
                      return await e
                        .selectFrom(l)
                        .selectAll()
                        .where(i({ model: l, field: r }), o === null ? `is` : `=`, o)
                        .limit(1)
                        .executeTakeFirst();
                    }
                    await s.execute();
                    let fetchInserted = async (e) => {
                      if (a.id)
                        return await e
                          .selectFrom(l)
                          .selectAll()
                          .where(i({ model: l, field: `id` }), `=`, a.id)
                          .limit(1)
                          .executeTakeFirst();
                      if (f.advanced?.database?.generateId === `serial`) {
                        let t = (await d`SELECT LAST_INSERT_ID() as id`.execute(e)).rows[0]?.id;
                        if (t)
                          return await e
                            .selectFrom(l)
                            .selectAll()
                            .where(i({ model: l, field: `id` }), `=`, t)
                            .limit(1)
                            .executeTakeFirst();
                      }
                      let n = o[c(l)]?.fields;
                      if (n)
                        for (let [t, r] of Object.entries(n)) {
                          if (!r.unique) continue;
                          let n = i({ model: l, field: t }),
                            o = a[n];
                          if (o == null) continue;
                          let s = await e
                            .selectFrom(l)
                            .selectAll()
                            .where(n, `=`, o)
                            .limit(1)
                            .executeTakeFirst();
                          if (s) return s;
                        }
                      let r = e.selectFrom(l).selectAll(),
                        s = !1;
                      for (let [e, t] of Object.entries(a))
                        t !== void 0 && ((r = r.where(e, t === null ? `is` : `=`, t)), (s = !0));
                      if (s) {
                        let e = await r.limit(2).execute();
                        if (e.length === 1) return e[0];
                      }
                      return (
                        t.warn(
                          `[Kysely Adapter] Unable to safely identify the inserted "${l}" row on MySQL. Enable Better Auth ID generation or use generateId: "serial" for reliable behavior.`,
                        ),
                        null
                      );
                    };
                    return n ? fetchInserted(e) : e.transaction().execute(fetchInserted);
                  }
                  return r?.type === `mssql`
                    ? await s.outputAll(`inserted`).executeTakeFirst()
                    : await s.returningAll().executeTakeFirst();
                };
              function convertWhereClause(e, t) {
                if (!t) return { and: null, or: null };
                let n = { and: [], or: [] };
                return (
                  t.forEach((t) => {
                    let {
                        field: a,
                        value: o,
                        operator: s = `eq`,
                        connector: c = `AND`,
                        mode: l = `sensitive`,
                      } = t,
                      u = o,
                      d = i({ model: e, field: a }),
                      f =
                        l === `insensitive` &&
                        (typeof u == `string` ||
                          (Array.isArray(u) && u.every((e) => typeof e == `string`))),
                      expr = (t) => {
                        let n = `${e}.${d}`;
                        if (s.toLowerCase() === `in`) {
                          if (f) {
                            let { lhs: e, values: r } = insensitiveIn(
                              n,
                              Array.isArray(u) ? u : [u],
                            );
                            return t(e, `in`, r);
                          }
                          return t(n, `in`, Array.isArray(u) ? u : [u]);
                        }
                        if (s.toLowerCase() === `not_in`) {
                          if (f) {
                            let { lhs: e, values: r } = insensitiveNotIn(
                              n,
                              Array.isArray(u) ? u : [u],
                            );
                            return t(e, `not in`, r);
                          }
                          return t(n, `not in`, Array.isArray(u) ? u : [u]);
                        }
                        if (s === `contains`)
                          return f && typeof u == `string`
                            ? insensitiveIlike(n, `%${u}%`, r?.type)
                            : t(n, `like`, `%${u}%`);
                        if (s === `starts_with`)
                          return f && typeof u == `string`
                            ? insensitiveIlike(n, `${u}%`, r?.type)
                            : t(n, `like`, `${u}%`);
                        if (s === `ends_with`)
                          return f && typeof u == `string`
                            ? insensitiveIlike(n, `%${u}`, r?.type)
                            : t(n, `like`, `%${u}`);
                        if (s === `eq`) {
                          if (u === null) return t(n, `is`, null);
                          if (f && typeof u == `string`) {
                            let { lhs: e, value: r } = insensitiveEq(n, u);
                            return t(e, `=`, r);
                          }
                          return t(n, `=`, u);
                        }
                        if (s === `ne`) {
                          if (u === null) return t(n, `is not`, null);
                          if (f && typeof u == `string`) {
                            let { lhs: e, value: r } = insensitiveNe(n, u);
                            return t(e, `<>`, r);
                          }
                          return t(n, `<>`, u);
                        }
                        return s === `gt`
                          ? t(n, `>`, u)
                          : s === `gte`
                            ? t(n, `>=`, u)
                            : s === `lt`
                              ? t(n, `<`, u)
                              : s === `lte`
                                ? t(n, `<=`, u)
                                : t(n, s, u);
                      };
                    c === `OR` ? n.or.push(expr) : n.and.push(expr);
                  }),
                  { and: n.and.length ? n.and : null, or: n.or.length ? n.or : null }
                );
              }
              function processJoinedResults(e, t, n) {
                if (!t || !e.length) return e;
                let r = new Map();
                for (let a of e) {
                  let e = {},
                    o = {};
                  for (let [e] of Object.entries(t)) o[u(e)] = {};
                  for (let [t, r] of Object.entries(a)) {
                    let a = String(t),
                      s = !1;
                    for (let { joinModel: e, fieldName: t, joinModelRef: c } of n)
                      if (
                        a === `_joined_${c}_${t}` ||
                        a === `_Joined${capitalizeFirstLetter(c)}${capitalizeFirstLetter(t)}`
                      ) {
                        ((o[u(e)][i({ model: e, field: t })] = r), (s = !0));
                        break;
                      }
                    s || (e[t] = r);
                  }
                  let s = e.id;
                  if (!s) continue;
                  if (!r.has(s)) {
                    let n = { ...e };
                    for (let [e, r] of Object.entries(t))
                      n[u(e)] = r.relation === `one-to-one` ? null : [];
                    r.set(s, n);
                  }
                  let c = r.get(s);
                  for (let [e, n] of Object.entries(t)) {
                    let t = n.relation === `one-to-one`,
                      r = n.limit ?? 100,
                      a = o[u(e)],
                      s = a && Object.keys(a).length > 0 && Object.values(a).some((e) => e != null);
                    if (t) c[u(e)] = s ? a : null;
                    else {
                      let t = u(e);
                      if (Array.isArray(c[t]) && s) {
                        if (c[t].length >= r) continue;
                        let n = i({ model: e, field: `id` }),
                          o = a[n];
                        o
                          ? !c[t].some((e) => e[n] === o) && c[t].length < r && c[t].push(a)
                          : c[t].length < r && c[t].push(a);
                      }
                    }
                  }
                }
                let a = Array.from(r.values());
                for (let e of a)
                  for (let [n, r] of Object.entries(t))
                    if (r.relation !== `one-to-one`) {
                      let t = u(n);
                      if (Array.isArray(e[t])) {
                        let n = r.limit ?? 100;
                        e[t].length > n && (e[t] = e[t].slice(0, n));
                      }
                    }
                return a;
              }
              return {
                async create({ data: t, model: n }) {
                  let r = e.insertInto(n).values(t);
                  return await withReturning(t, r, n, []);
                },
                async findOne({ model: t, where: n, select: r, join: a }) {
                  let { and: o, or: s } = convertWhereClause(t, n),
                    c = e
                      .selectFrom((e) => {
                        let n = e.selectFrom(t);
                        return (
                          o && (n = n.where((e) => e.and(o.map((t) => t(e))))),
                          s && (n = n.where((e) => e.or(s.map((t) => t(e))))),
                          (n =
                            r?.length && r.length > 0
                              ? n.select(r.map((e) => i({ model: t, field: e })))
                              : n.selectAll()),
                          n.as(`primary`)
                        );
                      })
                      .selectAll(`primary`);
                  if (a)
                    for (let [e, t] of Object.entries(a)) {
                      let [n, r] = e.includes(`.`) ? e.split(`.`) : [void 0, e];
                      c = c.leftJoin(`${e} as join_${r}`, (e) =>
                        e.onRef(`join_${r}.${t.on.to}`, `=`, `primary.${t.on.from}`),
                      );
                    }
                  let { allSelectsStr: l, allSelects: u } = selectAllJoins(a);
                  c = c.select(u);
                  let d = await c.execute();
                  if (!d || !Array.isArray(d) || d.length === 0) return null;
                  let f = d[0];
                  return a ? processJoinedResults(d, a, l)[0] : f;
                },
                async findMany({
                  model: t,
                  where: n,
                  limit: a,
                  select: o,
                  offset: s,
                  sortBy: c,
                  join: l,
                }) {
                  let { and: u, or: d } = convertWhereClause(t, n),
                    f = e
                      .selectFrom((e) => {
                        let n = e.selectFrom(t);
                        return (
                          r?.type === `mssql`
                            ? s === void 0
                              ? a !== void 0 && (n = n.top(a))
                              : (c || (n = n.orderBy(i({ model: t, field: `id` }))),
                                (n = n.offset(s).fetch(a || 100)))
                            : (a !== void 0 && (n = n.limit(a)), s !== void 0 && (n = n.offset(s))),
                          c?.field &&
                            (n = n.orderBy(`${i({ model: t, field: c.field })}`, c.direction)),
                          u && (n = n.where((e) => e.and(u.map((t) => t(e))))),
                          d && (n = n.where((e) => e.or(d.map((t) => t(e))))),
                          (n =
                            o?.length && o.length > 0
                              ? n.select(o.map((e) => i({ model: t, field: e })))
                              : n.selectAll()),
                          n.as(`primary`)
                        );
                      })
                      .selectAll(`primary`);
                  if (l)
                    for (let [e, t] of Object.entries(l)) {
                      let [n, r] = e.includes(`.`) ? e.split(`.`) : [void 0, e];
                      f = f.leftJoin(`${e} as join_${r}`, (e) =>
                        e.onRef(`join_${r}.${t.on.to}`, `=`, `primary.${t.on.from}`),
                      );
                    }
                  let { allSelectsStr: p, allSelects: m } = selectAllJoins(l);
                  ((f = f.select(m)),
                    c?.field && (f = f.orderBy(`${i({ model: t, field: c.field })}`, c.direction)));
                  let h = await f.execute();
                  return h ? (l ? processJoinedResults(h, l, p) : h) : [];
                },
                async update({ model: t, where: n, update: r }) {
                  if (n.length === 0) return null;
                  let { and: i, or: a } = convertWhereClause(t, n),
                    o = e.updateTable(t).set(r);
                  return (
                    i && (o = o.where((e) => e.and(i.map((t) => t(e))))),
                    a && (o = o.where((e) => e.or(a.map((t) => t(e))))),
                    await withReturning(r, o, t, n)
                  );
                },
                async updateMany({ model: t, where: n, update: r }) {
                  let { and: i, or: a } = convertWhereClause(t, n),
                    o = e.updateTable(t).set(r);
                  (i && (o = o.where((e) => e.and(i.map((t) => t(e))))),
                    a && (o = o.where((e) => e.or(a.map((t) => t(e))))));
                  let s = (await o.executeTakeFirst()).numUpdatedRows;
                  return s > 2 ** 53 - 1 ? 2 ** 53 - 1 : Number(s);
                },
                async count({ model: t, where: n }) {
                  let { and: r, or: i } = convertWhereClause(t, n),
                    a = e.selectFrom(t).select(e.fn.count(`id`).as(`count`));
                  (r && (a = a.where((e) => e.and(r.map((t) => t(e))))),
                    i && (a = a.where((e) => e.or(i.map((t) => t(e))))));
                  let o = await a.execute();
                  return typeof o[0].count == `number`
                    ? o[0].count
                    : typeof o[0].count == `bigint`
                      ? Number(o[0].count)
                      : parseInt(o[0].count);
                },
                async delete({ model: t, where: n }) {
                  let { and: r, or: i } = convertWhereClause(t, n),
                    a = e.deleteFrom(t);
                  (r && (a = a.where((e) => e.and(r.map((t) => t(e))))),
                    i && (a = a.where((e) => e.or(i.map((t) => t(e))))),
                    await a.execute());
                },
                async deleteMany({ model: t, where: n }) {
                  let { and: r, or: i } = convertWhereClause(t, n),
                    a = e.deleteFrom(t);
                  (r && (a = a.where((e) => e.and(r.map((t) => t(e))))),
                    i && (a = a.where((e) => e.or(i.map((t) => t(e))))));
                  let o = (await a.executeTakeFirst()).numDeletedRows;
                  return o > 2 ** 53 - 1 ? 2 ** 53 - 1 : Number(o);
                },
                async consumeOne({ model: t, where: a }) {
                  let { and: o, or: s } = convertWhereClause(t, a),
                    applyWhere = (e) => (
                      o && (e = e.where((e) => e.and(o.map((t) => t(e))))),
                      s && (e = e.where((e) => e.or(s.map((t) => t(e))))),
                      e
                    ),
                    c = i({ model: t, field: `id` }),
                    deleteSelectedRow = async (e, n) => {
                      let i = n[c] ?? n.id;
                      if (i == null) return null;
                      let a = e.deleteFrom(t).where(`${t}.${c}`, `=`, i);
                      if (r?.type === `mysql`) {
                        let e = await a.executeTakeFirst();
                        return Number(e.numDeletedRows) > 0 ? n : null;
                      }
                      return r?.type === `mssql`
                        ? ((await a.outputAll(`deleted`).executeTakeFirst()) ?? null)
                        : ((await a.returningAll().executeTakeFirst()) ?? null);
                    },
                    deleteWithReturning = async (e) =>
                      r?.type === `mssql`
                        ? ((await e.outputAll(`deleted`).executeTakeFirst()) ?? null)
                        : ((await e.returningAll().executeTakeFirst()) ?? null);
                  if (r?.type === `mysql`) {
                    let claimFromTransaction = async (e) => {
                      let n = await applyWhere(e.selectFrom(t).selectAll().forUpdate())
                        .limit(1)
                        .executeTakeFirst();
                      return n ? deleteSelectedRow(e, n) : null;
                    };
                    return n
                      ? claimFromTransaction(e)
                      : e.transaction().execute(claimFromTransaction);
                  }
                  let l = applyWhere(e.selectFrom(t).select(`${t}.${c}`)),
                    u = r?.type === `mssql` ? l.top(1) : l.limit(1);
                  return deleteWithReturning(e.deleteFrom(t).where(`${t}.${c}`, `in`, u));
                },
                async incrementOne({ model: t, where: a, increment: o, set: s }) {
                  let { and: c, or: l } = convertWhereClause(t, a),
                    applyWhere = (e) => (
                      c && (e = e.where((e) => e.and(c.map((t) => t(e))))),
                      l && (e = e.where((e) => e.or(l.map((t) => t(e))))),
                      e
                    ),
                    u = { ...(s ?? {}) };
                  for (let [e, t] of Object.entries(o)) u[e] = d`${d.ref(e)} + ${t}`;
                  let f = i({ model: t, field: `id` });
                  if (r?.type === `mysql`) {
                    let incrementInTransaction = async (e) => {
                      let n = await applyWhere(e.selectFrom(t).select(`${t}.${f}`).forUpdate())
                        .limit(1)
                        .executeTakeFirst();
                      if (!n) return null;
                      let r = n[f] ?? n.id;
                      if (r == null) return null;
                      let i = await applyWhere(e.updateTable(t).set(u))
                        .where(`${t}.${f}`, `=`, r)
                        .executeTakeFirst();
                      return Number(i.numUpdatedRows) === 0
                        ? null
                        : ((await e
                            .selectFrom(t)
                            .selectAll()
                            .where(`${t}.${f}`, `=`, r)
                            .limit(1)
                            .executeTakeFirst()) ?? null);
                    };
                    return n
                      ? incrementInTransaction(e)
                      : e.transaction().execute(incrementInTransaction);
                  }
                  let p = applyWhere(e.selectFrom(t).select(`${t}.${f}`)),
                    m = r?.type === `mssql` ? p.top(1) : p.limit(1),
                    h = e.updateTable(t).set(u).where(`${t}.${f}`, `in`, m);
                  return r?.type === `mssql`
                    ? ((await h.outputAll(`inserted`).executeTakeFirst()) ?? null)
                    : ((await h.returningAll().executeTakeFirst()) ?? null);
                },
                options: r,
              };
            },
          o = null;
        o = {
          config: {
            adapterId: `kysely`,
            adapterName: `Kysely Adapter`,
            usePlural: r?.usePlural,
            debugLogs: r?.debugLogs,
            supportsBooleans: !(
              r?.type === `sqlite` ||
              r?.type === `mssql` ||
              r?.type === `mysql` ||
              !r?.type
            ),
            supportsDates: !(r?.type === `sqlite` || r?.type === `mssql` || !r?.type),
            supportsJSON: r?.type === `postgres`,
            supportsArrays: !1,
            supportsUUIDs: r?.type === `postgres`,
            transaction: r?.transaction
              ? (t) =>
                  e
                    .transaction()
                    .execute((e) =>
                      t(
                        n({
                          config: { ...o.config, transaction: !1 },
                          adapter: createCustomAdapter(e, !0),
                        })(i),
                      ),
                    )
              : !1,
          },
          adapter: createCustomAdapter(e),
        };
        let s = n(o);
        return (e) => ((i = e), s(e));
      }));
  });
export { kyselyAdapter as i, getKyselyDatabaseType as n, p as r, createKyselyAdapter as t };
