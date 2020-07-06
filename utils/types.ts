import {
  Client,
  Message,
  Options,
} from "https://deno.land/x/coward@dev/mod.ts";

type Return = (Options.createMessage | string | void);

interface CommandObj {
  run: (
    this: Bot,
    message: Message,
    args: string[],
  ) => Return | Promise<Return>;
  help: string;
  aliases?: string[];
}

interface Bot extends Client {
  commands: Map<string, CommandObj>;
  aliases: Map<string, string>;
}

export {
  Return,
  Bot,
  CommandObj,
};
