import { Jobs } from '@universal-packages/background-jobs'
import { EnvironmentTagBlock } from '@universal-packages/core'
import { Color, GreenColor, OrangeColor, PinkColor, PurpleColor, WhiteColor } from '@universal-packages/terminal-document'
import { LoadingBlock, PresenterRowDescriptor } from '@universal-packages/terminal-presenter'

const ENVIRONMENT_COLORS: Record<string, { primary: Color; secondary: Color }> = {
  development: { primary: OrangeColor.OrangeRed, secondary: WhiteColor.White },
  production: { primary: PurpleColor.DarkMagenta, secondary: WhiteColor.White },
  test: { primary: PinkColor.MediumVioletRed, secondary: WhiteColor.White },
  other: { primary: PurpleColor.Purple, secondary: WhiteColor.White }
}

export function updatePresenterDoc() {
  const ENVIRONMENT_COLOR = ENVIRONMENT_COLORS[process.env.NODE_ENV] || ENVIRONMENT_COLORS.other
  const JOBS_SUBJECT = core.coreModules['jobsModule'].subject as Jobs
  const primaryColor = GreenColor.SeaGreen
  const documentRows: PresenterRowDescriptor[] = []

  documentRows.push({ blocks: [{ text: ' ' }] })

  const headerRow: PresenterRowDescriptor = {
    border: [true, false, false, false],
    borderStyle: 'double',
    borderColor: primaryColor,
    blocks: []
  }

  headerRow.blocks.push(LoadingBlock({ style: 'star' }))
  headerRow.blocks.push({ text: ' ', width: 'fit' })

  headerRow.blocks.push({
    color: primaryColor,
    style: 'bold',
    text: 'Jobs Performer',
    width: 'fit'
  })
  headerRow.blocks.push({ text: ' ', width: 'fit' })

  headerRow.blocks.push({ text: ' ' })

  headerRow.blocks.push({ backgroundColor: primaryColor, style: 'bold', text: ' JOBS ', width: 'fit' })
  headerRow.blocks.push({ text: ' ', width: 'fit' })
  headerRow.blocks.push(EnvironmentTagBlock())

  documentRows.push(headerRow)

  // MIDDLE ROW ===============================================================
  documentRows.push({ blocks: [{ text: ' ' }] })

  const middleRow: PresenterRowDescriptor = { blocks: [] }

  // STATS ===============================================================

  const statsRow: PresenterRowDescriptor = {
    border: [true, false, true, false],
    borderStyle: ['dash-4', 'double', 'double', 'double'],
    borderColor: primaryColor,
    blocks: []
  }

  statsRow.blocks.push({
    border: [false, true, false, false],
    borderStyle: ['dash-4', 'dash-4', 'double', 'dash-4'],
    borderColor: primaryColor,
    text: ` ${JOBS_SUBJECT.queue.constructor.name} `,
    width: 'fit'
  })

  statsRow.blocks.push({
    text: ` ${Object.keys(JOBS_SUBJECT.jobsCollection).length} ${Object.keys(JOBS_SUBJECT.jobsCollection).length === 1 ? 'Job Class' : 'Job Classes'} `,
    width: 'fit'
  })

  statsRow.blocks.push({
    border: [false, true, false, false],
    borderStyle: ['dash-4', 'dash-4', 'double', 'dash-4'],
    borderColor: primaryColor,
    text: ` Queues: ${Array.from(JOBS_SUBJECT.queueNames).join(', ')} `
  })

  documentRows.push(statsRow)

  core.TerminalPresenter.updateDocument('JOBS-DOC', { rows: documentRows })
}
