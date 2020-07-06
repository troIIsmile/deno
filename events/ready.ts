import { all } from "../messages.ts";
import { Bot, CommandObj } from "../utils/types.ts";
import random from "../utils/random.ts";
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir/mod.ts";
import { extname } from "https://deno.land/std/path/mod.ts";
function activityChanger(this: Bot) {
  // activityChanger from esmBot, also known as "the gamer code"
  this.modifyPresence({
    game: {
      name: random(all),
      type: 1,
    },
  });
  setTimeout(() => activityChanger.call(this), 900000);
}

export default async function (this: Bot) {
  // activityChanger.call(this)
  const files = (await recursiveReaddir("./commands/")).filter((file) =>
    extname(file) === ".ts"
  );
  let count = 0;
  const entries: [string, CommandObj][] = await Promise.all(
    files
      .map(async (file): Promise<[string, CommandObj]> => [
        file.replace(".ts", "").replace(/^.*[\\\/]/, ""), // Remove folders from the path and .ts, leaving only the command name
        {
          help: "A command without a description", // this will be overwritten by the real description if it is there
          ...(await import(`../${file}`)), // `run` and `desc`
        },
      ]), // convert filenames to commands
  ) as [string, CommandObj][];
  entries.forEach(([name, command]: [string, CommandObj]) => {
    this.commands.set(name, command);
    const dec = ++count / entries.length;
    console.log(
      `[${"█".repeat(dec * 10).padEnd(10)}]`,
      `Loaded ${name}.`,
      `(${count}/${entries.length} commands loaded)`,
    );
    command.aliases?.forEach((alias) => {
      this.aliases.set(alias, name);
    });
  });
}
