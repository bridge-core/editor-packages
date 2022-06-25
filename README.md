# editor-packages

Provides data such as schemas, file definitions or themes for bridge. v2

## Run dev environment

1. Create a .env file. Add `EDITOR_DIR=path/to/bridgev2/repo` to it. This path should point to the cloned bridge-core/editor repo
2. `deno task dev`

## Build for production

This repo hosts a GitHub action that automatically builds the packages folder and commits it to the `dev` branch of our [bridge-core/editor](https://github.com/bridge-core/editor) repo. You can manually trigger a build by running `deno task build`.
