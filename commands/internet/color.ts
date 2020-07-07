import { Message, Options } from "../../utils/types.ts";
export async function run(
  message: Message,
  args: string[],
): Promise<Options.createMessage> {
  const clr = args.join("");
  const res = await fetch(
    "https://colornames.org/search/json/?hex=" + encodeURIComponent(clr),
  );
  if (res.ok) {
    const { name } = await res.json();
    return {
      embed: {
        title: name || "Name not found!",
        color: clr,
        url: "https://colornames.org/color/" + clr,
      },
    };
  } else {
    return {
      embed: {
        color: "RED",
        title: "That isn't a hex color!",
      },
    };
  }
}
export const help = "Get the name of a color.";
