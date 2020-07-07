import { Client } from "https://deno.land/x/coward@dev/mod.ts";
import ready from "./events/ready.ts";
import commandHandler from "./events/messageCreate.ts";
import { Bot } from "./utils/types.ts";
import { token } from './config.ts'

const client: Bot = new Client(token) as Bot;
client.commands = new Map();
client.aliases = new Map();

client.evt.messageCreate.attach(({ message }) => {
  commandHandler.call(client, message);
}); // command handler

client.evt.ready.attach(() => {
  ready.call(client);
}); // funny message
client.connect();
