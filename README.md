# Best Buy RTX 3070 Drop Predictor

Just like everyone else, I'm trying to score a **RTX 3000 series graphics card**. Specifically,
I want the **[NVIDIA GeForce RTX 3070 Founders Edition](https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-8gb-gddr6-pci-express-4-0-graphics-card-dark-platinum-and-black/6429442.p?skuId=6429442)**, sold at Best Buy.

A lot of people have scripts and tools set up to continuosly poll Best Buy for when the card is in stock,
but I figured I would just try and use past data (from [NowInStock.net](https://www.nowinstock.net/full_historydetails/1483/52924/))
to try and predict when I should be checking the Best Buy website.

Will this work? Probably not, but it was a fun excuse to get a little more experience with React,
Redux, TypeScript, and Material UI, so who cares?

## Generating Data

I wrote some scripts to process and prepare the [NowInStock.net data]([NowInStock.net](https://www.nowinstock.net/full_historydetails/1483/52924/).
To run those scripts for yourself:

`
node utility/export-drops.js > ./dist/data/drops.json
node utility/analyze-drops.js './dist/data/drops.json' > ./dist/data/drops-analysis.json
`