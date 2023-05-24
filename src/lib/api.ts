import 'server-only'

export type Option = {
  title: string
  description: string
  votes: number
}

export async function fetchCurrentPoll() {
  await new Promise((r) => setTimeout(r, 100))

  const options: { option1: Option; option2: Option } = {
    option1: {
      title: 'Apples',
      description: 'Red and juicy',
      votes: 123,
    },
    option2: {
      title: 'Pears',
      description: 'Green and mushy',
      votes: 55,
    },
  }

  return options
}
