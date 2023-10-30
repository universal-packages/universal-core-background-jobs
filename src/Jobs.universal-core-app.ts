import { Jobs, JobsOptions } from '@universal-packages/background-jobs'
import { CoreApp } from '@universal-packages/core'
import { TerminalTransport } from '@universal-packages/logger'

export default class JobsApp extends CoreApp<JobsOptions> {
  public static readonly appName = 'jobs-performer'
  public static readonly description = 'Background jobs jobs core app'

  private jobs: Jobs

  public async prepare(): Promise<void> {
    const terminalTransport = this.logger.getTransport('terminal') as TerminalTransport
    terminalTransport.options.categoryColors['JOBS'] = 'KIWI'

    this.jobs = core.coreModules.jobsModule.subject

    this.jobs.on('enqueued', (event): void => {
      const jobItem = event.payload.jobItem

      this.logger.publish('DEBUG', 'Job enqueued', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('INFO', null, `${jobItem.name} enqueued in "${jobItem.queue}" queue`, 'JOBS', { metadata: jobItem.payload })
    })
    this.jobs.on('performed', (event): void => {
      const jobItem = event.payload.jobItem
      const measurement = event.measurement

      this.logger.publish('DEBUG', 'Job performed successfully', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('INFO', null, `${jobItem.name} performed successfully`, 'JOBS', { metadata: jobItem.payload, measurement: measurement.toString() })
    })
    this.jobs.on('retry', (event): void => {
      const jobItem = event.payload.jobItem
      const measurement = event.measurement
      const error = new Error(jobItem.error.message)
      error.stack = jobItem.error.stack

      this.logger.publish('DEBUG', 'Retrying job', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('WARNING', null, `Retrying ${jobItem.name} ${jobItem.retries}/${jobItem.maxRetries}`, 'JOBS', {
        error,
        metadata: jobItem.payload,
        measurement: measurement.toString()
      })
    })
    this.jobs.on('failed', (event): void => {
      const jobItem = event.payload.jobItem
      const measurement = event.measurement
      const error = new Error(jobItem.error.message)
      error.stack = jobItem.error.stack

      this.logger.publish('DEBUG', 'Job failed', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('ERROR', null, `${jobItem.name} failed`, 'JOBS', { error, metadata: jobItem.payload, measurement: measurement.toString() })
    })
    this.jobs.on('error', (event): void => {
      const jobItem = event.payload.jobItem
      const error = event.error

      this.logger.publish('DEBUG', 'Errored job', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('ERROR', 'Error trying to perform a job', null, 'JOBS', { error, metadata: jobItem.payload })
    })
  }

  public async run(): Promise<void> {
    await this.jobs.run()
  }

  public async stop(): Promise<void> {
    await this.jobs.stop()
  }
}
