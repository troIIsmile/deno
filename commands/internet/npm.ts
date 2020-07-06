import random from "../../utils/random.ts";
export async function run(): Promise<string> {
  const txt = await fetch(
    "https://raw.githubusercontent.com/npm/npm-expansions/master/expansions.txt",
  ).then((res) => res.text());
  return random(
    txt
      .split("\n")
      .filter((line) => !line.startsWith("#")),
  ).split(
    " ",
  ).map((word) => `**${word[0]}**${word.substring(1)}`)
    .join("\n");
}
export const help = "What does n-p-m stand for?";
