import { BaseJob } from '@universal-packages/background-jobs'

export default class GoodJob extends BaseJob {
  public async perform(_payload: Record<string, any>): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, Math.random() * 10000))
  }
}
