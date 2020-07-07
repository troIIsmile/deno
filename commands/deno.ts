import { Message } from "../utils/types.ts";

export function run (_message: Message, args: string[]): string {
  return args.join(' ').split('').sort().join('')
}
export const help = "Sort the input. Ex: node -> deno";
