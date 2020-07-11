import { Bot, Message, Options } from '../../../utils/types.ts'
export async function run (this: Bot, message: Message): Promise<Options.createMessage> {
  return {
    file: {
      file: await fetch(`https://api.adorable.io/avatars/2048/${message.author.username}.png`).then(res=>res.blob()),
      name: 'ava.png'
    }
  }
};
export const help = 'Adorable avatars!'
