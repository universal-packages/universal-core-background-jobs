import { CoreApp } from '@universal-packages/core'
import ExampleJob from './jobs/Example.job'

export default class ExampleApp extends CoreApp {
  public static readonly appName = 'example-app'
  public static readonly description = 'Test here your core stuff'

  private timeout: NodeJS.Timeout

  public async prepare(): Promise<void> {}

  public async run(): Promise<void> {
    await ExampleJob.performLater({ cosas: true })
    this.timeout = setTimeout((): void => {}, 999999999)
  }

  public async stop(): Promise<void> {
    clearTimeout(this.timeout)
  }

  public async release(): Promise<void> {}
}
