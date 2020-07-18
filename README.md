<div align="center">
	<img width="300" src="https://raw.githubusercontent.com/Jack5079/nxt/master/docs/icon.svg" alt="NXT">
</div>

---

A terrible Discord bot, but in Deno.

## Running

### Running the bot

```bash
deno run --allow-read=./ --allow-net --allow-env --unstable --importmap=import_map.json -c tsconfig.json bot.ts
```

### Random "Playing" message

```bash
deno run --allow-read=./utils/random.ts messages.ts
```
