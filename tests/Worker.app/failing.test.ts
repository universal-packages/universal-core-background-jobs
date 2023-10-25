import { sleep } from '@universal-packages/time-measurer'

import WorkerApp from '../__fixtures__/Worker.app'
import FailingJob from '../__fixtures__/failing/Failing.job'

jestCore.runApp(
  'jobs-worker',
  {},
  {
    apps: { location: './tests/__fixtures__' },
    config: { location: './tests/__fixtures__/config-failing' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: true }
  }
)

describe(WorkerApp, (): void => {
  it('receives events for retries and failings', async (): Promise<void> => {
    await FailingJob.performLater()
    await sleep(3000)
  })
})
