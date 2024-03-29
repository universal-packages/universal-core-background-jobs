import JA from '../src/Jobs.universal-core-app'
import GoodJob from './jobs/Good.job'

export default class JobsApp extends JA {
  private enqueueTimeout: NodeJS.Timeout

  public async prepare(): Promise<void> {
    this.enqueue()
    super.prepare()
  }

  public async stop(): Promise<void> {
    clearTimeout(this.enqueueTimeout)

    super.stop()
  }

  private async enqueue(): Promise<void> {
    GoodJob.performLater()

    this.enqueueTimeout = setTimeout((): void => {
      this.enqueue()
    }, 5000)
  }
}
