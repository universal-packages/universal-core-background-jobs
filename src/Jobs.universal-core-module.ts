import { Jobs, JobsOptions } from '@universal-packages/background-jobs'
import { CoreModule } from '@universal-packages/core'

import { LOG_CONFIGURATION } from './LOG_CONFIGURATION'

export default class JobsModule extends CoreModule<JobsOptions> {
  public static readonly moduleName = 'jobs-module'
  public static readonly description = 'Background jobs core module wrapper'
  public static readonly defaultConfig: JobsOptions = { jobsLocation: './src' }

  public subject: Jobs

  public async prepare(): Promise<void> {
    this.subject = new Jobs({ ...this.config })

    this.subject.on('enqueued', (event): void => {
      const jobItem = event.payload.jobItem

      this.logger.log(
        {
          level: 'DEBUG',
          title: 'Job enqueued',
          category: 'JOBS',
          metadata: jobItem
        },
        LOG_CONFIGURATION
      )
      this.logger.log(
        {
          level: 'INFO',
          title: 'Job enqueued',
          message: `${jobItem.name} enqueued in "${jobItem.queue}" queue`,
          category: 'JOBS',
          metadata: jobItem.payload
        },
        LOG_CONFIGURATION
      )
    })

    await this.subject.prepare()
  }

  public async release(): Promise<void> {
    await this.subject.release()
  }
}
