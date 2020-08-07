import { Client } from "coward";
import { Bot } from "./utils/types.ts";
import { token } from "./config.ts";
import { basename } from "https://deno.land/std/path/mod.ts";

const client: Bot = new Client(token) as Bot;
client.commands = new Map();
client.aliases = new Map();

// Load events
// @todo: make this readable!
for await (const file of Deno.readDir("events")) {
  const evt = Object.entries(client.evt).find(([name]) =>
    basename(file.name).replace(".ts", "") === name
  )?.[1]
  
  evt?.attach(async (ctx) => {
    (await import("./events/" + file.name)).default.call(client, ctx);
  });
}

client.connect();
