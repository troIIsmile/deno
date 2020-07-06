import { Message, Options } from "https://deno.land/x/coward@dev/mod.ts"
import { Bot } from "../../utils/types.ts"
export async function run (
  this: Bot,
  _message: Message,
  args: string[],
): Promise<Options.createMessage> {
  const res = await fetch(
    `https://projectlounge.pw/ytdl/download?url=${
    encodeURIComponent(
      args.join(" "),
    )
    }`,
  )
  if (res.ok) {
    return {
      file: {
        file: await res.blob(),
        name: "video.mp4",
      },
    }
  } else {
    return {
      content: "The download servers had an issue: " +
        `${res.status}: ${res.statusText}`,
    }
  }
}
export const help = "Download a video."
export const aliases = ['dl']
