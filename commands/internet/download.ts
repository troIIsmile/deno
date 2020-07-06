import { Message, Options } from "https://deno.land/x/coward@dev/mod.ts";
import { Bot } from '../../utils/types.ts'
export async function run (this: Bot, message: Message, args: string[]): Promise<Options.createMessage> {
  const video = await fetch(
  `https://projectlounge.pw/ytdl/download?url=${
    encodeURIComponent(
      args.join(" "),
    )
  }`,
  ).then((res) => res.blob());
  return {
    file: {
      file: video,
      name: 'video.mp4'
    }
  }
}
export const help = 'Download a video.'
export const aliases = []
