import { Message, Options } from "https://deno.land/x/coward@dev/mod.ts";
import { Bot } from "../../../utils/types.ts";
export async function run(
  this: Bot,
  _message: Message,
  args: string[],
): Promise<Options.createMessage> {
  return {
    file: {
      file: await fetch(
        "https://roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=" +
          args.join("%20"),
      ).then((res) => res.blob()),
      name: "avatar.png",
    },
  };
}
export const help = "it's free";
export const aliases = [];
