import { Bot, Message, Options } from "../../utils/types.ts";
import random from "../../utils/random.ts";
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir/mod.ts";
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
      [name, { help: desc }],
    ) => [
      name,
      desc || "",
    ],
  )
    .sort((a, b) => {
      return a[0].localeCompare(b[0] || "") || -1;
    });
  const title = this.aliases.get(args.join(' ')) || args.join(' ');
  if (this.commands.has(title)) {
    const source = (await recursiveReaddir("./commands/")).find((name) =>
  name.endsWith(title + ".ts")
);
    return {
      embed: {
        title,
        description: this.commands.get(title)?.help,
        fields: [{
          name: "📛 Aliases",
          value: this.commands.get(title)?.aliases?.join(", "),
        }, {
            name: '👨‍💻 Source code',
            value: source ? 'https://github.com/Jack5079/nxt-deno/blob/master/' + source : 'Not found!'
        }].filter(field=>field.value),
      },
    };
  }
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
            name: "Tip",
            value: random([
              "Submit playing lines, feature requests & bug reports @ " +
              JSON.parse(await Deno.readTextFile("./info.json")).bugs,
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
