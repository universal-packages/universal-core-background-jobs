import { Logger } from '@universal-packages/logger'
import { Worker } from '@universal-packages/background-jobs'
import EventEmitter from 'events'
import WorkerApp from '../src/Worker.universal-core-app'

class ClassMock extends EventEmitter {
  public prepare() {
    this.emit('enqueued', { item: {}, measurement: '' })
    this.emit('performed', { jobItem: {}, measurement: '' })
    this.emit('retry', { jobItem: { error: {} }, measurement: '' })
    this.emit('failed', { jobItem: { error: {} }, measurement: '' })
    this.emit('error', { jobItem: {}, measurement: '' })
  }
  public run = jest.fn()
  public stop = jest.fn()
  public release = jest.fn()
}

jest.mock('@universal-packages/background-jobs')
const WorkerMock = Worker as unknown as jest.Mock
WorkerMock.mockImplementation((): ClassMock => new ClassMock())

describe('WorkerApp', (): void => {
  it('behaves as expected', async (): Promise<void> => {
    const logger = new Logger({ silence: true })
    const module = new WorkerApp({} as any, {} as any, logger)

    global.core = { coreModules: { jobsModule: 'options' } } as any

    await module.prepare()
    await module.run()
    await module.stop()
    await module.release()
  })
})
