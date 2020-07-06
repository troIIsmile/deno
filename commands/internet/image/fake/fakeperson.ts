import { Options } from "https://deno.land/x/coward@dev/mod.ts";
export async function run (): Promise<Options.createMessage> {
  return {
    file: {
      file: await fetch('https://thispersondoesnotexist.com/image').then(res => res.blob()),
      name: 'person.jpeg'
    }
  }
}
export const help = 'this person does not exist'
export const aliases = []
