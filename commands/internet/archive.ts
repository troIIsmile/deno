import { Message, Options } from "../../utils/types.ts";
import "https://deno.land/x/arrays/mod.ts";
interface Item {
  title: string;
  identifier: string;
}
interface Result {
  count: number;
  total: number;
  items: Item[];
  cursor:string;
}

interface ErrorResult {
  error: string;
  errorType: string;
}
export async function run(
  message: Message,
  args: string[],
): Promise<Options.createMessage> {
  const json: Result & ErrorResult = await fetch(
    "https://archive.org/services/search/v1/scrape?fields=title&q=" +
      encodeURIComponent(args.join(" ")),
  ).then((res) => res.json());
  if (json.error) {
    return {
      embed: {
        title: "ERROR",
        color: "RED",
        description: json.error,
        fields: [{ name: "Type", value: json.errorType }],
      },
    };
  }
  const items: Item[] = json.items.chunk(20)[0];
  return {
    embed: {
      title: `Results for "${args.join(' ')}"`,
      footer: {
        text: `${json.total.toLocaleString()} results | ${json.count.toLocaleString()} scraped`
      },
      description: items.map(({title,identifier})=>`[${title}](https://archive.org/details/${encodeURIComponent(identifier)}/)`).join('\n')
    },
  };
}
export const help = "Search the Internet Archive";
