import { Bot } from "../utils/types.ts";
import random from '../utils/random.ts'
export function run(this: Bot): string {
  const emojis = Array.from(
    this.guilds.values(),
    (guild) => Array.from(guild.emojis.values()),
  ).flat();
  const emoji = random(emojis)
  return `<:${emoji.name}:${emoji.id}>`
}
export const help = "Get a random emoji from the servers this bot is on.";
export const aliases = [];
