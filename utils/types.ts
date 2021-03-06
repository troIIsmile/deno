import {
  Client,
  Message,
  Options,
} from "coward";

export type Return = (Options.createMessage | string | void);

export interface CommandObj {
  run: (
    this: Bot,
    message: Message,
    args: string[],
  ) => Return | Promise<Return>;
  help: string;
  aliases?: string[];
}

export interface Bot extends Client {
  commands: Map<string, CommandObj>;
  aliases: Map<string, string>;
}

export { Message, Options } from "coward";
