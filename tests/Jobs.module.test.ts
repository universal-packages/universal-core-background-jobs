import { JobsModule } from '../src'
import GoodJob from './__fixtures__/jobs/Good.job'

jestCore.runBare({
  coreConfigOverride: {
    config: { location: './tests/__fixtures__/config-test' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: true }
  }
})

describe(JobsModule, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    expect(global.jobsSubject).not.toBeUndefined()
    expect(global.jobsSubject.options).toEqual({
      additional: [],
      concurrentPerformers: 1,
      jobsLocation: './tests/__fixtures__/jobs',
      queue: 'test',
      queuePriority: {},
      waitTimeIfEmptyRound: 0
    })

    await GoodJob.performLater({ foo: 'bar' })

    expect(GoodJob).toHaveBeenEnqueuedWith({ foo: 'bar' })
  })
})
