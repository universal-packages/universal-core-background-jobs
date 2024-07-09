import { BackgroundJobsModule } from '../src'
import GoodJob from './__fixtures__/jobs/Good.job'

coreJest.runBare({
  coreConfigOverride: {
    config: { location: './tests/__fixtures__/config-test' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: true }
  }
})

describe(BackgroundJobsModule, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    expect(global.backgroundJobsSubject).not.toBeUndefined()
    expect(global.backgroundJobsSubject.options).toEqual({
      concurrentPerformers: 1,
      jobsLocation: './tests/__fixtures__/jobs',
      loaders: {},
      loaderOptions: {},
      queue: 'test',
      queuePriority: {},
      waitTimeIfEmptyRound: 0
    })

    await GoodJob.performLater({ foo: 'bar' })

    expect(GoodJob).toHaveBeenEnqueuedWith({ foo: 'bar' })
  })
})
