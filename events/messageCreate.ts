import { Bot, Message } from "../utils/types.ts";

export default async function (this: Bot, message: Message) {
  // When a message is sent
  if (!message.author?.bot) {
    // no bots allowed
    const prefix: string =
      message.channel === await this.getDMChannel(message.author.id) ? "" : "-"; // nothing if it's a dm
    const content = message.content || "";
    const name = [...this.commands.keys(), ...this.aliases.keys()].find(
      (cmdname) =>
        content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
        content === `${prefix}${cmdname}`, // matches any command without arguments
    );
    // Run the command!
    if (name) {
      const command = this.commands.get(name)?.run || // The command if it found it
        this.commands.get(this.aliases.get(name) || "")?.run || // Aliases
        (() => {}); // Do nothing otherwise

      const output = await command.call(
        this,
        message as Message, // the message
        // The arguments
        content
          .substring(prefix.length + 1 + name.length) // only the part after the command
          .split(" "), // split with spaces
      );

      if (output) {
        this.createMessage(message.channel.id, output);
      }
    }
  }
}
