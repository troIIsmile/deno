import { Options } from "https://deno.land/x/coward@dev/mod.ts";
export async function run(): Promise<Options.createMessage> {
  return {
    content: "😎 i voted for poop",
  };
}
export const help = "Hello, world!";
export const aliases = [];
