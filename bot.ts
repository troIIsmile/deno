import { Client } from "https://deno.land/x/coward@dev/mod.ts";
import ready from "./events/ready.ts";
import commandHandler from "./events/messageCreate.ts";
import { Bot } from "./utils/types.ts";
const exists = async (filename: string): Promise<boolean> => {
  try {
    await Deno.stat(filename);
    // successful, file or directory must exist
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
};

interface Env {
  [key: string]: string;
}

const env: Env = {
  ...Deno.env.toObject(),
  // load in env
  ...(await exists(".env")
    ? Object.fromEntries(
      (await Deno.readTextFile(".env")).split("\n").map((line) =>
        line.split("=")
      ),
    )
    : {}),
};

const client: Bot = new Client(env.TOKEN) as Bot;
client.commands = new Map();
client.aliases = new Map();

client.evt.messageCreate.attach(({ message }) => {
  commandHandler.call(client, message);
}); // command handler

client.evt.ready.attach(() => {
  ready.call(client);
}); // funny message
client.connect();
