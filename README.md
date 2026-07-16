# ss22-colours
Web based paint colour picker for a yacht.

https://eggplantpasta.github.io/ss22-colours/

## Run locally for development

Opening `docs/index.html` directly with `file://` can trigger browser security errors like:

`Unsafe attempt to load URL ... 'file:' URLs are treated as unique security origins.`

Serve the `docs` folder over a local HTTP server instead:

```bash
cd docs
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.
