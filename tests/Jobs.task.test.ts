import { Logger } from '@universal-packages/logger'
import { populateTemplates } from '@universal-packages/template-populator'

import JobsTask from '../src/Jobs.universal-core-task'

jest.mock('@universal-packages/template-populator')

describe(JobsTask, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    await jestCore.execTask(
      'jobs-task',
      'init',
      [],
      { f: true },
      {
        config: { location: './tests/__fixtures__/config-test' },
        modules: { location: './tests/__fixtures__' },
        tasks: { location: './tests/__fixtures__' },
        logger: { silence: true }
      }
    )

    expect(populateTemplates).toHaveBeenCalledWith(expect.stringMatching(/universal-core-background-jobs\/src\/template/), './src', { override: true })
  })

  it('throws an error if directive is not recognized', async (): Promise<void> => {
    jest.spyOn(process, 'exit').mockImplementation()

    await jestCore.execTask(
      'jobs-task',
      'nop',
      [],
      { f: true },
      {
        config: { location: './tests/__fixtures__/config-test' },
        modules: { location: './tests/__fixtures__' },
        tasks: { location: './tests/__fixtures__' },
        logger: { silence: true }
      }
    )

    expect(process.exit).toHaveBeenCalledWith(1)
  })
})
