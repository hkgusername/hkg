import alchemy from "alchemy";
import { Astro } from "alchemy/cloudflare";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";

config({ path: "./.env" });
config({ path: "../../apps/web/.env" });

const app = await alchemy("hkg", {
  stage: "prod",
  stateStore: (scope) => new CloudflareStateStore(scope),
});

export const web = await Astro("web", {
  cwd: "../../apps/web",
  bindings: {
    PUBLIC_SERVER_URL: alchemy.env.PUBLIC_SERVER_URL!,
  },
});

console.log(`Web    -> ${web.url}`);

await app.finalize();
