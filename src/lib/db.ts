import 'server-only'
import { OptionId } from './types'

export type Option = {
  title: string
  description: string
  votes: number
}

let options: Record<OptionId, Option> = {
  option1: {
    title: 'Apples',
    description: 'Red and juicy',
    votes: 1,
  },
  option2: {
    title: 'Pears',
    description: 'Green and mushy',
    votes: 1,
  },
}

export const db = {
  async getCurrentPoll() {
    console.log('get current poll')
    await wait()
    return options
  },
  async vote(optionId: OptionId) {
    console.log('1', 1)
    await wait()
    console.log('2', 1)
    options[optionId].votes++
    console.log('3', 1)
  },
}

async function wait() {
  return new Promise((r) => setTimeout(r, 2_000))
}
