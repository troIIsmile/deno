export function run(): string {
  return "node".split("").sort(() => Math.random() - 0.5).join("");
}
export const help = "Making a Node.js alternative and need a name? Try this!";
export const aliases = ['node'];
