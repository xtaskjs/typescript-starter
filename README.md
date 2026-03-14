# typescript-starter

TypeScript starter project for xTaskJS using the Express adapter from the upstream repository:
https://github.com/xtaskjs/xtask

This starter gives you:

- TypeScript source layout under `src/`
- xTaskJS controllers and dependency injection
- Express-backed HTTP runtime via `@xtaskjs/express-http`
- Static assets under `public/` and file-based views under `views/`
- Unit and integration tests
- A vendored copy of the upstream xTaskJS repository under `vendor/xtask`
- A production build that emits `dist/` and can be launched from there

## Upstream dependency strategy

The published npm packages currently do not expose a usable consumer build for this starter. To keep the project runnable, this repository vendors the upstream source under `vendor/xtask` and installs `@xtaskjs/common`, `@xtaskjs/core`, and `@xtaskjs/express-http` from local tarballs generated from that vendored source.

Those tarballs live in `vendor/packs/` and are used directly by `npm install`.

If you want to refresh the starter against a newer upstream checkout, run:

```bash
npm run prepare:xtask
```

## Why the source runtime uses `ts-node`

xTaskJS currently autoloads application classes by scanning the project `src/` directory at runtime and relies on decorator metadata for dependency injection. Because of that, the local development and test entrypoints use `ts-node`, which preserves the emitted decorator metadata needed by xTaskJS while still running directly from TypeScript source.

For production-style execution, the build outputs compiled code into `dist/`, copies `views/` and `public/`, and then starts the app with the working directory set to `dist/` so xTaskJS scans `dist/src` instead of the original TypeScript sources.

## Project structure

```text
.
├── vendor/
├── public/
├── scripts/
├── src/
├── tests/
│   ├── integration/
│   └── unit/
├── views/
├── package.json
├── tsconfig.build.json
└── tsconfig.json
```

## Main files

- `src/app.ts`: creates the Express app and xTaskJS application instance
- `main.ts`: startup entrypoint used by `npm start`
- `src/home.controller.ts`: HTML page rendered through xTaskJS `view(...)`
- `src/health.controller.ts`: JSON health endpoint
- `src/greeting.service.ts`: DI-managed service used by the controllers
- `tests/unit/greeting.service.test.ts`: unit test example
- `tests/integration/app.integration.test.ts`: integration tests against the Express app

## Install

```bash
npm install
```

That install also prepares the vendored xTaskJS packages automatically.

## Run locally

Start the app directly from TypeScript source:

```bash
npm start
```

Development mode with file watching:

```bash
npm run dev
```

Default URL:

```text
http://127.0.0.1:3000
```

Available routes:

- `GET /`
- `GET /health`

You can override the bind address with environment variables:

```bash
HOST=0.0.0.0 PORT=4000 npm start
```

## Tests

Run everything:

```bash
npm test
```

Run only unit tests:

```bash
npm run test:unit
```

Run only integration tests:

```bash
npm run test:integration
```

The test runner uses Node's built-in test framework together with `ts-node`, which keeps the test runtime compatible with xTaskJS autoloading of TypeScript files from `src/` and preserves dependency injection metadata.

## Type checking

```bash
npm run typecheck
```

## Production build

Build the application:

```bash
npm run build
```

Launch the compiled output:

```bash
npm run start:prod
```

That command:

1. compiles TypeScript into `dist/`
2. copies `views/` and `public/` into `dist/`
3. starts the compiled app with `dist/` as the working directory so xTaskJS scans `dist/src` while using `dist/main.js` as the process entrypoint

## How xTaskJS is wired here

The starter depends on package directories sourced from the vendored upstream xTaskJS repository:

- `@xtaskjs/core`
- `@xtaskjs/common`
- `@xtaskjs/express-http`

The application factory in `src/app.ts` does three things:

1. creates an Express instance
2. wraps it with `new ExpressAdapter(expressApp)`
3. passes that adapter into `CreateApplication(...)`

Controllers are discovered automatically because xTaskJS scans the active `src/` directory and loads decorated classes.

## Next changes you can make

- Add more controllers and services under `src/`
- Add persistence with `@xtaskjs/typeorm`
- Add authentication later with `@xtaskjs/security`
