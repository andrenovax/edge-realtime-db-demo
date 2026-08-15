import { flue, flueWorkerConfig } from "@flue/vite";
import { resolveConfig, type Plugin, type PluginOption } from "vite";

type FlueDurableObjectBinding = {
  class_name: string;
  name: string;
};

type FlueWorkerConfig = {
  compatibility_date?: string;
  compatibility_flags?: string[];
  durable_objects?: { bindings?: FlueDurableObjectBinding[] };
  main?: string;
};

export type FlueAlchemyManifest = {
  compatibilityDate: string;
  compatibilityFlags: string[];
  durableObjects: Array<{ bindingName: string; className: string }>;
  main: string;
};

/**
 * Flue 2.0 currently recognizes only @cloudflare/vite-plugin as a Cloudflare
 * host. Alchemy injects its own Cloudflare Vite plugin later, so this small
 * host adapter invokes Flue's public worker-config customizer and captures
 * the generated entry/binding manifest without starting a second runtime.
 *
 * Remove this bridge once Flue accepts Alchemy as a native Cloudflare host.
 */
export function flueAlchemyPlugins(initialConfig: FlueWorkerConfig = {}): {
  plugins: PluginOption[];
  workerConfig: FlueWorkerConfig;
} {
  const fluePlugins = flue();
  const customizeWorker = flueWorkerConfig();
  const workerConfig = structuredClone(initialConfig);
  const host: Plugin = {
    name: "vite-plugin-cloudflare:alchemy",
    config() {
      customizeWorker(workerConfig);
    },
  };

  return { plugins: [fluePlugins, host], workerConfig };
}

/** Resolve the same Flue manifest Vite will use, without running a build. */
export async function resolveFlueAlchemyManifest(
  root: string,
  compatibilityDate: string,
  main: string,
): Promise<FlueAlchemyManifest> {
  const integration = flueAlchemyPlugins({
    compatibility_date: compatibilityDate,
    main,
  });
  await resolveConfig(
    {
      configFile: false,
      plugins: integration.plugins,
      root,
    },
    "build",
  );

  const { workerConfig } = integration;
  if (workerConfig.main !== main) {
    throw new Error(
      `[flue-alchemy] Expected Flue Worker entry ${main}, got ${String(workerConfig.main)}`,
    );
  }
  if (workerConfig.compatibility_date !== compatibilityDate) {
    throw new Error("[flue-alchemy] Flue changed the requested compatibility date");
  }

  return {
    main: workerConfig.main,
    compatibilityDate,
    compatibilityFlags: workerConfig.compatibility_flags ?? [],
    durableObjects: (workerConfig.durable_objects?.bindings ?? []).map((binding) => ({
      bindingName: binding.name,
      className: binding.class_name,
    })),
  };
}
