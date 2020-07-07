import { Options, Message } from "https://deno.land/x/coward@dev/mod.ts";
import { DOMParser } from "https://raw.githubusercontent.com/rtbenfield/deno-dom/master/mod.ts";
export async function run(message: Message): Promise<Options.createMessage> {
  const male = Number(
    new DOMParser().parseFromString(
      await fetch(
        "https://pbump.net/files/post/names/find.php?who=" +
          encodeURIComponent(message.author.username),
      ).then(
        (res) => res.text(),
      ),
      "text/xml",
    ).getElementsByTagName("like").item(0)?.getAttribute("male"),
  );

  const sex = male >= 0.5 || male === -1 ? "m" : "f";
  return {
    file: {
      file: await fetch(
        `https://belikebill.ga/billgen-API.php?default=1&name=${encodeURIComponent(message.author.username)}&sex=` + sex,
      ).then((res) => res.blob()),
      name: "bill.jpeg",
    },
  };
}
export const help = "be like bill";
