# Core Background Jobs

[![npm version](https://badge.fury.io/js/@universal-packages%2Fcore-background-jobs.svg)](https://www.npmjs.com/package/@universal-packages/core-background-jobs)
[![Testing](https://github.com/universal-packages/universal-core-background-jobs/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-core-background-jobs/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-core-background-jobs/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-core-background-jobs)

[Background Jobs](https://github.com/universal-packages/universal-background-jobs) universal-core module abstraction.

## Install

```shell
npm install @universal-packages/core-background-jobs

npm install @universal-packages/core
npm install redis
```

## Initialization

```shell
ucore exec jobs-task init
```

## Performer

```shell
ucore run jobs-performer
```

## Global

Core expose `Jobs` as the global subject if core `modulesAsGlobals` config is true.

```js
jobsSubject
```

Or

```js
core.coreModules.jobsModule.subject
```

## Typescript

In order for typescript to see the global types you need to reference the types somewhere in your project, normally `./src/globals.d.ts`.

```ts
/// <reference types="@universal-packages/core-background-jobs" />
```

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
