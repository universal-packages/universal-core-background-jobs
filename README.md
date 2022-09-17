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
npm install @redis
```

## Initialization

```shell
ucore exec jobs-task init
```
## Usage

Core will expose the module `jobsModule` as a global if configured or in the core global object as in `coreModules`.

```js
jobsModule.jobs.performLater()
```

```js
core.coreModules['jobs-module'].jobs.performLater()
```

This is not really necesary since the `Jobs` interface enable Jobs classes to be able to enqueue themselves so make sure to do that instead.

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
