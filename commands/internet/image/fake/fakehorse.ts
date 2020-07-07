import { Options } from "../../../../utils/types.ts";
export async function run (): Promise<Options.createMessage> {
  return {
    file: {
      file: await fetch('https://thishorsedoesnotexist.com').then(res => res.blob()),
      name: 'horse.jpeg'
    }
  }
}
export const help = 'this horse does not exist'
export const aliases = []
