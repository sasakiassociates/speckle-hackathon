# @speckle/viewer-sandbox

Sandbox for testing, debugging & developing the viewer package

## Setup

### Requirements

- Node ^16

### Instructions

- `yarn install` in this package
- `yarn run dev` to run the sandbox, it's available at `localhost:3033`

## Linting

Use `npm run lint` to run ESLint and you can also run `npm run lint:tsc` to lint with the TypeScript compiler

## hacky-sack

Speckle's npm packages are correctly configured with 'dist' folders. This folder provides a hacky workaround that just pulls everything down locally. This also lets us add custom code (like size counts and selection support).
