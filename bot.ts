import { Client } from "coward";
import { Bot } from "./utils/types.ts";
import { token } from "./config.ts";
import messageCreate from './events/messageCreate.ts'
import ready from "./events/ready.ts";
const client: Bot = <Bot>new Client(token);
client.commands = new Map();
client.aliases = new Map();

// Load events
client.evt.messageCreate.attach(ctx => {
  messageCreate.bind(client, ctx.message)
})

client.evt.ready.attach(() => {
  ready.bind(client);
});
client.connect();
