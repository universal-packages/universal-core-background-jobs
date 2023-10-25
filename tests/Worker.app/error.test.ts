import { sleep } from '@universal-packages/time-measurer'

import WorkerApp from '../__fixtures__/Worker.app'
import ExcellentJob from '../__fixtures__/jobs/Excellent.job'
import GoodJob from '../__fixtures__/jobs/Good.job'

jestCore.runApp('jobs-worker', {
  coreConfigOverride: {
    apps: { location: './tests/__fixtures__' },
    config: { location: './tests/__fixtures__/config-jobs' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: true }
  }
})

describe(WorkerApp, (): void => {
  it('receives events for errors', async (): Promise<void> => {
    const workerApp = core.appInstance as WorkerApp
    const worker = workerApp.worker
    const performer = worker['performers'][0]

    delete performer.options.jobs['GoodJob']

    await GoodJob.performLater({ good: true })
    await ExcellentJob.performLater({ excellent: true })

    await sleep(1000)

    expect(GoodJob.performJestFn).not.toHaveBeenCalledWith({ good: true })
    expect(ExcellentJob.performJestFn).toHaveBeenCalledWith({ excellent: true })
  })
})
