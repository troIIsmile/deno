// @todo add permissions
import { Message } from "https://deno.land/x/coward@dev/mod.ts";
import { Bot } from '../../utils/types.ts'
export async function run (this: Bot, message: Message): Promise<never> {
  await this.createMessage(message.channel.id, 'Bye!')
  Deno.exit()
}
export const help = 'Shutdown the bot.'
export const aliases = ['reboot']
