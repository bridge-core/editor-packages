# editor-packages

Provides data such as schemas, file definitions or themes for bridge. v2

## Run dev environment

1. Create a .env file. Add `EDITOR_DIR=path/to/bridgev2/repo` to it. This path should point to the cloned bridge-core/editor repo
2. `deno run -A --import-map=importMap.json ./scripts/build/dev.ts`
