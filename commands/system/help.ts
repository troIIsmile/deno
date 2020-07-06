import { Message, Options } from "https://deno.land/x/coward@dev/mod.ts";
import { Bot } from "../../utils/types.ts";
import random from '../../utils/random.ts'
function chunk(array: any[], size: number = 1): string[][] {
  let chunk: any[] = [];
  return array.reduce((acc, curr, idx, arr) => {
    chunk.push(curr);
    if (chunk.length === size) {
      acc.push(chunk);
      chunk = [];
    }
    if (chunk.length > 0 && idx === arr.length - 1) {
      acc.push(chunk);
    }
    return acc;
  }, []);
}
export async function run(
  this: Bot,
  _message: Message,
  args: string[],
): Promise<Options.createMessage> {
  const page = parseInt(args.join("")) || 1;
  const commands = Array.from(
    this.commands.entries(),
    (
      [name, { help: desc, aliases }],
    ) => [
      name +
      ((aliases && aliases.length)
        ? ` (Aliases: ${aliases?.join(", ")})`
        : ""),
      desc || "",
    ],
  )
    .sort((a, b) => {
      return a[0].localeCompare(b[0] || "") || -1;
    });
  const pages = chunk(commands, 20);
  return pages[page - 1]
    ? {
      embed: {
        title: `nxt commands`,
        description: pages[page - 1].map((
          [name, description],
        ) => `**${name}** - ${description}`).join("\n"),
        footer: {
          iconURL:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/VisualEditor_-_Icon_-_Book.svg/600px-VisualEditor_-_Icon_-_Book.svg.png",
          text: `${page}/${pages.length}`,
        },
        fields: [
          {
            name: "Prefix",
            value: "-",
          },
          {
            name: "Tip",
            value: random([
              "Submit playing lines, feature requests & bug reports @ " +
              JSON.parse(await Deno.readTextFile("./package.json")).bugs,
              "This is a rewrite of nxt in Deno.",
            ]),
          },
        ],
      },
    }
    : {
      embed: {
        title: `nxt commands`,
        description: "That page does not exist.",
      },
    };
}
export const help = "A new command";
export const aliases = [];
