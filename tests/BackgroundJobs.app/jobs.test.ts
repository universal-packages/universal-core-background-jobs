import { sleep } from '@universal-packages/time-measurer'

import JobsApp from '../__fixtures__/BackgroundJobs.app'
import ExcellentJob from '../__fixtures__/jobs/Excellent.job'
import GoodJob from '../__fixtures__/jobs/Good.job'

coreJest.runApp('background-jobs', {
  coreConfigOverride: {
    apps: { location: './tests/__fixtures__' },
    config: { location: './tests/__fixtures__/config-jobs' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: true }
  }
})

describe(JobsApp, (): void => {
  it('receives events for jobs enqueued and performed', async (): Promise<void> => {
    await GoodJob.performLater({ good: true })
    await ExcellentJob.performLater({ excellent: true })

    await sleep(1000)

    expect(GoodJob.performJestFn).toHaveBeenCalledWith({ good: true })
    expect(ExcellentJob.performJestFn).toHaveBeenCalledWith({ excellent: true })
  })
})
