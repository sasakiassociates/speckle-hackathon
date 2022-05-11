# @speckle/viewer-sandbox

Sandbox for testing, debugging & developing the viewer package

## Setup

### Requirements

- Node ^16

### Instructions

- `npm install` in this package
- `npx lerna bootstrap` in repo root to set up symlink with viewer package
- `npm run dev` to run the sandbox, it's available at `localhost:3033`

## Linting

Use `npm run lint` to run ESLint and you can also run `npm run lint:tsc` to lint with the TypeScript compiler


## @speckle/objectloader
NOTE: npm package for objectloader does not contain dist folder
HACK(athon) solution. run `speckle-server\packages\objectloader>npm run build:dev` the MANUALLY COPY the dist folder into `node_modules`
for convenience the dist is also copied to _hacky_even_for_a_hackathon/objloader/dist
