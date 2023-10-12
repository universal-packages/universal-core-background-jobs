import { Jobs } from '@universal-packages/background-jobs'
import { Logger } from '@universal-packages/logger'
import { EventEmitter } from 'stream'

import { JobsModule } from '../src'

class ClassMock extends EventEmitter {
  public prepare() {
    this.emit('enqueued', { payload: { jobItem: {} }, measurement: '' })
    this.emit('performed', { payload: { jobItem: {} }, measurement: '' })
    this.emit('retry', { payload: { jobItem: { error: {} } }, measurement: '' })
    this.emit('failed', { payload: { jobItem: { error: {} } }, measurement: '' })
  }
  public start = jest.fn()
  public stop = jest.fn()
  public release = jest.fn()
}

jest.mock('@universal-packages/background-jobs')
const JobsMock = Jobs as unknown as jest.Mock
JobsMock.mockImplementation((): ClassMock => new ClassMock())

describe(JobsModule, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    const logger = new Logger({ silence: true })
    const module = new JobsModule({} as any, logger)

    global['core'] = { coreModules: { redisModule: 'client' } } as any

    await module.prepare()

    await module.release()
  })
})
