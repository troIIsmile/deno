import { Client } from "https://deno.land/x/coward@dev/mod.ts";
import { Bot } from "./utils/types.ts";
import { token } from "./config.ts";
import { basename } from "https://deno.land/std/path/mod.ts";
const client: Bot = new Client(token) as Bot;
client.commands = new Map();
client.aliases = new Map();

for await (const file of Deno.readDir("events")) {
  Object.entries(client.evt).find(([name]) =>
    basename(file.name).replace(".ts", "") === name
  )?.[1].attach(async (ctx) => {
    (await import("./events/" + file.name)).default.call(client, ctx);
  });
}
client.connect();
