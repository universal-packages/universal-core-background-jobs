import { sleep } from '@universal-packages/time-measurer'

import BackgroundJobsApp from '../__fixtures__/BackgroundJobs.app'
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

describe(BackgroundJobsApp, (): void => {
  it('receives events for errors', async (): Promise<void> => {
    const performer = backgroundJobsSubject['performers'][0]
    delete performer.options.jobs['GoodJob']

    await GoodJob.performLater({ good: true })
    await ExcellentJob.performLater({ excellent: true })

    await sleep(1000)

    expect(GoodJob.performJestFn).not.toHaveBeenCalledWith({ good: true })
    expect(ExcellentJob.performJestFn).toHaveBeenCalledWith({ excellent: true })
  })
})
