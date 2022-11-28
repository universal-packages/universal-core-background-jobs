# Core Background Jobs

[![npm version](https://badge.fury.io/js/@universal-packages%2Fcore-background-jobs.svg)](https://www.npmjs.com/package/@universal-packages/core-background-jobs)
[![Testing](https://github.com/universal-packages/universal-core-background-jobs/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-core-background-jobs/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-core-background-jobs/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-core-background-jobs)

[Background Jobs](https://github.com/universal-packages/universal-background-jobs) universal-core module abstraction.

## Install

```shell
npm install @universal-packages/core-background-jobs
npm install @universal-packages/core-redis
npm install @universal-packages/background-jobs
npm install redis
```

## Initialization

```shell
ucore exec jobs-task init
```
## Global

Core expose `Jobs` as the global subject if core `modulesAsGlobals` config is true.

```js
jobsSubject.set()
```

```js
core.coreModules.jobsModule.subject.set()
```

### Typescript

In order for typescript to see the `jobsSubject` global you need to reference the types somewhere in your project, normally `./src/globals.ts`.

This is not really necessary since the `Jobs` interface enable Jobs classes to be able to enqueue themselves so make sure to do that instead.

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
