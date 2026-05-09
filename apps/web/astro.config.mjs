import { fileURLToPath } from "node:url";

// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
const forceNodeLocal =
  process.env.ASTRO_LOCAL_NODE === "1" ||
  process.env.ASTRO_LOCAL_NODE === "true";
const cloudflareWorkersShimPath = fileURLToPath(
  new URL("../../packages/env/src/cloudflare-local.ts", import.meta.url),
);
const cloudflareWorkersAlias = forceNodeLocal
  ? {
      "cloudflare:workers": cloudflareWorkersShimPath,
    }
  : {};
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react()],
  adapter: forceNodeLocal ? node({ mode: "standalone" }) : cloudflare(),
  env: {
    schema: {
      PUBLIC_SERVER_URL: envField.string({
        access: "public",
        context: "client",
        default: "http://localhost:3000",
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: cloudflareWorkersAlias },
  },
});
