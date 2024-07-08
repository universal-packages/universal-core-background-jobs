import { BackgroundJobs, BackgroundJobsOptions } from '@universal-packages/background-jobs'
import { CoreApp } from '@universal-packages/core'

import { LOG_CONFIGURATION } from './LOG_CONFIGURATION'
import { updatePresenterDoc } from './common/updatePresenterDoc'

export default class BackgroundJobsApp extends CoreApp<BackgroundJobsOptions> {
  public static readonly appName = 'background-jobs'
  public static readonly description = 'Background jobs core app'

  private backgroundJobs: BackgroundJobs

  public async prepare(): Promise<void> {
    this.backgroundJobs = core.coreModules.backgroundJobs.subject

    this.backgroundJobs.on('enqueued', (event): void => {
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
    this.backgroundJobs.on('performed', (event): void => {
      const jobItem = event.payload.jobItem
      const measurement = event.measurement

      this.logger.log(
        {
          level: 'DEBUG',
          title: 'Job performed successfully',
          category: 'JOBS',
          metadata: jobItem
        },
        LOG_CONFIGURATION
      )
      this.logger.log(
        {
          level: 'INFO',
          title: 'Job performed successfully',
          message: `${jobItem.name} performed successfully`,
          category: 'JOBS',
          metadata: jobItem.payload,
          measurement: measurement.toString()
        },
        LOG_CONFIGURATION
      )
    })
    this.backgroundJobs.on('retry', (event): void => {
      const jobItem = event.payload.jobItem
      const measurement = event.measurement
      const error = new Error(jobItem.error.message)
      error.stack = jobItem.error.stack

      this.logger.log(
        {
          level: 'DEBUG',
          title: 'Retrying job',
          category: 'JOBS',
          metadata: jobItem
        },
        LOG_CONFIGURATION
      )
      this.logger.log(
        {
          level: 'WARNING',
          title: 'Retrying job',
          message: `Retrying ${jobItem.name} ${jobItem.retries}/${jobItem.maxRetries}`,
          category: 'JOBS',
          error,
          metadata: jobItem.payload,
          measurement: measurement.toString()
        },
        LOG_CONFIGURATION
      )
    })
    this.backgroundJobs.on('failed', (event): void => {
      const jobItem = event.payload.jobItem
      const measurement = event.measurement
      const error = new Error(jobItem.error.message)
      error.stack = jobItem.error.stack

      this.logger.log(
        {
          level: 'DEBUG',
          title: 'Job failed',
          category: 'JOBS',
          metadata: jobItem
        },
        LOG_CONFIGURATION
      )
      this.logger.log(
        {
          level: 'ERROR',
          title: `${jobItem.name} failed`,
          category: 'JOBS',
          error,
          metadata: jobItem.payload,
          measurement: measurement.toString()
        },
        LOG_CONFIGURATION
      )
    })
    this.backgroundJobs.on('error', (event): void => {
      const jobItem = event.payload.jobItem
      const error = event.error

      this.logger.log(
        {
          level: 'DEBUG',
          title: 'Errored job',
          category: 'JOBS',
          metadata: jobItem
        },
        LOG_CONFIGURATION
      )
      this.logger.log(
        {
          level: 'ERROR',
          title: 'Error trying to perform a job',
          category: 'JOBS',
          error,
          metadata: jobItem.payload
        },
        LOG_CONFIGURATION
      )
    })

    this.setTerminalPresenter()
  }

  public async run(): Promise<void> {
    await this.backgroundJobs.run()
  }

  public async stop(): Promise<void> {
    await this.backgroundJobs.stop()
  }

  private setTerminalPresenter(): void {
    core.terminalPresenter.prependRealTimeDocument('JOBS-DOC', { rows: [{ blocks: [{ text: ' ' }] }] })

    updatePresenterDoc()
  }
}
