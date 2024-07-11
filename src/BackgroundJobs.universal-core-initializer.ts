import { CoreInitializer } from '@universal-packages/core'

export default class BackgroundJobsInitializer extends CoreInitializer {
  public static readonly initializerName = 'background-jobs'
  public static readonly description: string = 'Background jobs initializer for universal core.'

  public readonly templatesLocation: string = `${__dirname}/templates`
}
