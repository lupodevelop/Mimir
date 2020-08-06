import { desc, task, sh, run } from "https://deno.land/x/drake@v1.2.6/mod.ts";

desc("Run Mimir Server");
task("start", [], async function () {
  await sh(
    "deno run --allow-net --allow-write --allow-read --allow-plugin --unstable mod.ts",
  );
});

desc("Run Mimir via denon for development");
task("denon", [], async function () {
  await sh(
    "deno run --allow-net --allow-write --allow-read --allow-plugin --unstable mod.ts",
  );
});

desc("Cache and lock dependencies");
task("cache", [], async function () {
  await sh(
    "deno cache --lock=lock.json --lock-write mod.ts",
  );
});

desc("Install denon for development");
task("denon-install", [], async function () {
  await sh("deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.3.1/denon.ts");
});

run();