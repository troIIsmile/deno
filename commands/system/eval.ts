import { Message, Options, Bot } from "../../utils/types.ts";
/**
 * "Clean" removes @everyone pings, as well as tokens, and makes code blocks
 * escaped so they're shown more easily. As a bonus it resolves promises
 * and stringifies objects!
 * @author Évelyne Lachance <eslachance@gmail.com> (http://luckyevelyne.wordpress.com/)
 * @license MIT
 * @param client A Coward client.
 * @param text Any object.
 */
async function clean(client: Bot, text: any): Promise<string> {
  if (text && text instanceof Promise) text = await text;
  if (typeof text !== "string") text = Deno.inspect(text, { depth: 1 });
  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(client.token, "<redacted>");
  return text;
}
export async function run(
  this: Bot,
  _message: Message,
  args: string[],
): Promise<Options.createMessage> {
  try {
    const code = args.join(" ");
    const evaled = eval(code);
    const txt = await clean(this, evaled);
    const msg = `\`\`\`js\n${txt}\n\`\`\``;
    if (msg.length <= 2000) return { content: msg };

    return {
      content:
        "The output was more than 2000 characters; here is a file with the output:",
      file: {
        name: "output.txt",
        file: new Blob([txt]),
      },
    };
  } catch (err) {
    return {
      content: `\`ERROR\` \`\`\`xl\n${await clean(this, err)}\n\`\`\``,
    };
  }
}

export const help = "A new command";
