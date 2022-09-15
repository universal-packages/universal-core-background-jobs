import { Logger } from '@universal-packages/logger'
import { populateTemplates } from '@universal-packages/template-populator'
import JobsTask from '../src/Jobs.universal-core-task'

jest.mock('@universal-packages/template-populator')

describe('JobsTask', (): void => {
  it('behaves as expected', async (): Promise<void> => {
    const logger = new Logger({ silence: true })

    let task = new JobsTask('init', [], {}, logger, {})
    await task.exec()
    expect(populateTemplates).toHaveBeenCalled()
  })
})
