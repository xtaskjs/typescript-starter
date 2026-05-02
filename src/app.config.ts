const diResolutionStrategy: "eager" | "lazy" =
  process.env.XTASK_DI_STRATEGY === "eager" ? "eager" : "lazy";

export const appConfig = {
  name: "xTaskJS TypeScript Starter",
  description: "Minimal starter wired for xTaskJS controllers, views, and automated tests.",
  host: process.env.HOST || "127.0.0.1",
  port: Number(process.env.PORT || 3000),
  container: {
    resolutionStrategy: diResolutionStrategy,
    metricsEnabled: process.env.XTASK_DI_METRICS !== "false",
  },
  hotManifestWatcher: {
    enabled: process.env.NODE_ENV === "development",
    debounceMs: Number(process.env.XTASK_HOT_DEBOUNCE_MS || 60),
  },
  prebuiltManifest: {
    enabled: process.env.NODE_ENV === "production",
  },
};