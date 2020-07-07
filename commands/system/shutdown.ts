// @todo add permissions
import { Bot, Message } from '../../utils/types.ts'
export async function run (this: Bot, message: Message): Promise<never> {
  await this.createMessage(message.channel.id, 'Bye!')
  Deno.exit()
}
export const help = 'Shutdown the bot.'
export const aliases = ['reboot']
