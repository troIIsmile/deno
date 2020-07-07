import { Options } from "../../../../utils/types.ts";
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
