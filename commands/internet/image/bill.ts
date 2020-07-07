import { Options, Message } from "https://deno.land/x/coward@dev/mod.ts";
import { stringify } from "https://deno.land/std/node/querystring.ts";
export async function run(
  message: Message,
  args: string[],
): Promise<Options.createMessage> {
  // The gender detection API returns XML, this code justs extracts the confidence value.
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
  // Send the image
  return {
    file: {
      file: await fetch(
        "https://belikebill.ga/billgen-API.php?" +
          stringify(
            args.join("").length // If there's any text
              ? {
                text: args.join(" "), // Only do the text the user gave
              }
              : { // Auto-generated
                name: message.author.username, // The user's name
                default: 1, // Default means have the API make the text
                sex: male >= 0.5 || male === -1 ? "m" : "f", // The API returns a confidence value. -1 means the name wasn't found.
              },
          ),
      ).then((res) => res.blob()),
      name: "bill.jpeg",
    },
  };
}
export const help = "be like bill";
