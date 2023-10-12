import { Jobs, JobsOptions } from '@universal-packages/background-jobs'
import { CoreModule } from '@universal-packages/core'
import { TerminalTransport } from '@universal-packages/logger'

export default class JobsModule extends CoreModule<JobsOptions> {
  public static readonly moduleName = 'jobs-module'
  public static readonly description = 'Background jobs core module wrapper'
  public static readonly defaultConfig: JobsOptions = { jobsLocation: './src' }

  public subject: Jobs

  public async prepare(): Promise<void> {
    const terminalTransport = this.logger.getTransport('terminal') as TerminalTransport
    terminalTransport.options.categoryColors['JOBS'] = 'KIWI'

    this.subject = new Jobs({ ...this.config })

    this.subject.on('enqueued', (event): void => {
      const jobItem = event.payload.jobItem

      this.logger.publish('DEBUG', 'Job enqueued', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('INFO', null, `${jobItem.name} enqueued in "${jobItem.queue}" queue`, 'JOBS', { metadata: jobItem.payload })
    })

    await this.subject.prepare()
  }

  public async release(): Promise<void> {
    await this.subject.release()
  }
}
