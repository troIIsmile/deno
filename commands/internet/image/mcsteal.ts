import { Bot, Message, Options } from "../../../utils/types.ts";
export async function run(
  this: Bot,
  _message: Message,
  args: string[],
): Promise<Options.createMessage> {
  const res = await fetch(
    "https://minecraftskinstealer.com/api/v1/skin/render/skin/" +
      encodeURI(args.join(" ")),
  );
  return res.ok
    ? { // If it worked
      file: {
        file: await res.blob(),
        name: "skin.png",
      },
    }
    : { // If it failed
      embed: {
        title: res.status === 404
          ? "Player not found!"
          : `${res.status}: ${res.statusText}`,
        description:
          "OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo!",
        color: "RED",
      },
    };
}
export const help = "Get the skin of a Minecraft: Java Edition player. Syntax: mcsteal <username>";
export const aliases = ["mc"];
