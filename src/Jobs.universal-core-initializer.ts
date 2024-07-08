import CoreInitializer from '@universal-packages/core/CoreInitializer'

export default class GoodInitializer extends CoreInitializer {
  public static readonly initializerName = 'background-jobs'

  public readonly templatesLocation: string = `${__dirname}/templates`
}
