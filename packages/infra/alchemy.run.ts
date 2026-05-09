import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("hkg", {
  stage: "prod",
});

export const web = await Astro("web", {
  cwd: "../../apps/web",
  adopt: true,
  bindings: {
    PUBLIC_SERVER_URL: process.env.PUBLIC_SERVER_URL ?? "https://hkg.gg",
  },
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
