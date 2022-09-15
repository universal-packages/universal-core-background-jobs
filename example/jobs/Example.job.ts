import { BaseJob } from '@universal-packages/background-jobs'

export default class ExampleJob extends BaseJob<{ hola: string }> {
  public static schedule = { cronTime: '* * * * *' }
  public async perform(payload: any) {
    console.log(payload)
  }
}
