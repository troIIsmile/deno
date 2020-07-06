<div align="center">
	<img width="300" src="https://raw.githubusercontent.com/Jack5079/nxt/master/docs/icon.svg" alt="NXT">
</div>

---

A terrible Discord bot, but in Deno.

## How to install?

1. Rename `example.env` to `.env`

2. Open `.env` and:
   1. Replace the text after `TOKEN=` with your bot's token


## Running

### Running the bot

```bash
deno run --allow-read=./ --allow-net --allow-env -c tsconfig.json bot.ts
```

### Random "Playing" message

```bash
deno run messages.ts
```
