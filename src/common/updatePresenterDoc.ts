import { Jobs } from '@universal-packages/background-jobs'
import { EnvironmentTagBlock } from '@universal-packages/logger-terminal-presenter'
import { GreenColor } from '@universal-packages/terminal-document'
import { LoadingBlock, PresenterRowDescriptor } from '@universal-packages/terminal-presenter'
import { OPTIONS, updateRealTimeDocument } from '@universal-packages/terminal-presenter'

export function updatePresenterDoc() {
  if (!OPTIONS.enabled) return

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

  core.terminalPresenter.updateRealTimeDocument('JOBS-DOC', { rows: documentRows })
}
