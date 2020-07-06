import { Options } from "https://deno.land/x/coward@dev/mod.ts"
export async function run (): Promise<Options.createMessage> {
  return {
    file: {
      file: await fetch('https://thiscatdoesnotexist.com').then(res => res.blob()),
      name: 'cat.jpeg'
    }
  }
}
export const help = 'this cat does not exist'
export const aliases = []
