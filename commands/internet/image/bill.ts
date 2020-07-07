import { Options, Message } from "https://deno.land/x/coward@dev/mod.ts";
import { stringify } from "https://deno.land/std/node/querystring.ts";
export async function run(message: Message): Promise<Options.createMessage> {
  const male = Number(
    (await fetch(
      "https://pbump.net/files/post/names/find.php?who=" +
        encodeURIComponent(message.author.username),
    ).then(
      (res) => res.text(),
    )).split("\n")[1].replace(
      /[^0-9\.]+/g,
      "",
    ),
  );

  return {
    file: {
      file: await fetch(
        "https://belikebill.ga/billgen-API.php?" + stringify({
          name: message.author.username,
          default: 1,
          sex: male >= 0.5 || male === -1 ? "m" : "f",
        }),
      ).then((res) => res.blob()),
      name: "bill.jpeg",
    },
  };
}
export const help = "be like bill";
