import { Options } from "../../../../utils/types.ts"
export async function run (): Promise<Options.createMessage> {
  return {
    file: {
      file: await fetch('https://thisartworkdoesnotexist.com').then(res => res.blob()),
      name: 'art.jpeg'
    }
  }
}
export const help = 'this art does not exist'
export const aliases = []
