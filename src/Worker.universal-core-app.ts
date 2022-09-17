import { JobsWorkerOptions, Worker } from '@universal-packages/background-jobs'
import { CoreApp } from '@universal-packages/core'
import { TerminalTransport } from '@universal-packages/logger'

export default class WorkerApp extends CoreApp<JobsWorkerOptions> {
  public static readonly appName = 'jobs-worker'
  public static readonly description = 'Redis core module wrapper'

  public worker: Worker

  public async prepare(): Promise<void> {
    const terminalTransport = this.logger.getTransport('terminal') as TerminalTransport
    terminalTransport.options.categoryColors['JOBS'] = 'KIWI'

    this.worker = new Worker({ ...this.config, ...core.coreModules['jobs-module'].config })

    this.worker.on('enqueued', ({ item }): void => {
      this.logger.publish('DEBUG', 'Job enqueued', null, 'JOBS', { metadata: item })
      this.logger.publish('INFO', null, `${item.name} enqueued in "${item.queue}" queue`, 'JOBS', { metadata: item.payload })
    })
    this.worker.on('performed', ({ jobItem, measurement }): void => {
      this.logger.publish('DEBUG', 'Job performed successfully', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('INFO', null, `${jobItem.name} performed successfully`, 'JOBS', { metadata: jobItem.payload, measurement: measurement.toString() })
    })
    this.worker.on('retry', ({ jobItem, measurement }): void => {
      const error = new Error(jobItem.error.message)
      error.stack = jobItem.error.stack
      this.logger.publish('DEBUG', 'Retrying job', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('WARNING', null, `Retrying ${jobItem.name} ${jobItem.retries}/${jobItem.maxRetries}`, 'JOBS', {
        error,
        metadata: jobItem.payload,
        measurement: measurement.toString()
      })
    })
    this.worker.on('failed', ({ jobItem, measurement }): void => {
      const error = new Error(jobItem.error.message)
      error.stack = jobItem.error.stack
      this.logger.publish('DEBUG', 'Job failed', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('ERROR', null, `${jobItem.name} failed`, 'JOBS', { error, metadata: jobItem.payload, measurement: measurement.toString() })
    })
    this.worker.on('error', ({ error, jobItem }): void => {
      this.logger.publish('DEBUG', 'Errored job', null, 'JOBS', { metadata: jobItem })
      this.logger.publish('ERROR', 'Error trying to perform a job', null, 'JOBS', { error, metadata: jobItem.payload })
    })

    await this.worker.prepare()
  }

  public async run(): Promise<void> {
    await this.worker.run()
  }

  public async stop(): Promise<void> {
    await this.worker.stop()
  }

  public async release(): Promise<void> {
    await this.worker.release()
  }
}
