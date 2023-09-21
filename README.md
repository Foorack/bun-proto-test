# bun-proto-test

This is a simple project to replicate the bun-proto bug.

## Verify it works with Node

`node index.js`

Go to `https://localhost:4343` and see it says `https`.

## Verify it is broken in Bun

`bun run index.js`

Go to `https://localhost:4343` and see it says `http`.