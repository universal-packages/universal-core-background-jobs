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

    this.subject = new Jobs({ client: core.coreModules.redisModule.subject, ...this.config })

    this.subject.on('enqueued', ({ item }): void => {
      this.logger.publish('DEBUG', 'Job enqueued', null, 'JOBS', { metadata: item })
      this.logger.publish('INFO', null, `${item.name} enqueued in "${item.queue}" queue`, 'JOBS', { metadata: item.payload })
    })

    await this.subject.prepare()
  }

  public async release(): Promise<void> {
    await this.subject.release()
  }
}
