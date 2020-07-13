import { Bot, Options } from '../../utils/types.ts'
import { all as messages } from '../../messages.ts'
export async function run (this: Bot): Promise<Options.createMessage> {
  const timestamp = performance.now() / 1000;

// hours
const hours = Math.floor(timestamp / 60 / 60);
  const esmBotMessages: string[] = await fetch('https://raw.githubusercontent.com/TheEssem/esmBot/master/messages.json').then(res => res.json())
  const linesFromEsmBot = messages.filter((line: string) => esmBotMessages.includes(line)).length
  const percentOfLines = (linesFromEsmBot * 100) / messages.length
  return {
    embed: {
      author: {
        name: "About nxt-deno",
        url: JSON.parse(await Deno.readTextFile('./info.json')).homepage
      },
      description: '`jackbot-next-next` lol',
      color: 0x454545,
      fields: [{
        name: '✏ Credits',
        value: `[${percentOfLines.toFixed(5)}% of the "Playing" messages from esmBot](https://github.com/TheEssem/esmBot/blob/master/messages.json)`,
        inline: false
      }, {
        name: '💬 Server Count',
        value: this.guilds.size,
        inline: true
      }, {
        name: '🧑🏻 User Count',
        value: this.users.size,
        inline: true
      }, {
        name: 'ℹ Bot Version',
        value: JSON.parse(await Deno.readTextFile('./info.json')).version,
        inline: true
      }, {
        name: '🦕 Deno Version',
        inline: true,
        value: Deno.version.deno
        }, {
        name: '☑ TypeScript Version',
        inline: true,
        value: Deno.version.typescript
      }, {
        name: '⏩ V8 Version',
        inline: true,
        value: Deno.version.v8
      }, {
        name: '🖥 OS',
        value: Deno.build.os,
        inline: true
      }, {
        name: '>_ Command Count',
        value: this.commands.size,
        inline: true
      }, {
        name: '⏰ Uptime',
        value: [hours.toString().padStart(2, '0'), (Math.floor(timestamp / 60) - (hours * 60)).toString().padStart(2, '0'), Math.floor(timestamp % 60).toString().padStart(2, '0')].join(':'),
        inline: true
      }]
    }
  }
}
export const help = 'Info about the bot.'
export const aliases = ['list', 'stats']
