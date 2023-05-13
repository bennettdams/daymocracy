import { Title } from '@/components/Title'
import { getStartOfTomorrowUTC } from '@/lib/server-utils'
import Image from 'next/image'
import handImage from '../../public/assets/hand.png'
import { Timer } from './Timer'

export default function Home(): JSX.Element {
  const startOfTomorrowUTC = getStartOfTomorrowUTC()
  return (
    // `relative` is need because `GoVote` is positioned absolute
    <main className="relative">
      <h1 className="text-center text-5xl font-bold">Daymocracy</h1>

      <h2 className="text-center text-2xl">A new poll, every day.</h2>

      <div className="static right-0 top-0 mt-10 lg:absolute lg:mt-0">
        <GoVote />
      </div>

      <div className="mt-10 lg:mt-20">
        <TimeLeft startOfTomorrowUTC={startOfTomorrowUTC} />
      </div>

      <div className="mt-10 lg:mt-20">
        <Poll votesOption1={1} votesOption2={2} />
      </div>

      <div className="mt-10 lg:mt-20">
        <Title>Previous posts</Title>
      </div>
    </main>
  )
}

function PollOption(): JSX.Element {
  return (
    <div className="pg:p-10 flex-1 rounded-lg bg-indigo-100 p-6 text-center text-indigo-800">
      <Title>Option 1</Title>

      <div>This is a description that further explains the option</div>

      <div className="grid w-full place-items-center bg-red-200">
        <div className="h-44 w-44 bg-blue-200">image</div>
      </div>
    </div>
  )
}

function PollOptions(): JSX.Element {
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <PollOption />

      <p className="mx-10 grid place-items-center font-serif text-6xl">vs.</p>

      <PollOption />
    </div>
  )
}

function Poll({
  votesOption1,
  votesOption2,
}: {
  votesOption1: number
  votesOption2: number
}): JSX.Element {
  const allVotes = votesOption1 + votesOption2

  // option 1's percentage of all votes
  const option1RatioPercentage = Math.round((votesOption1 / allVotes) * 100)
  const option2RatioPercentage = 100 - option1RatioPercentage

  return (
    <div className="flex w-full flex-col text-center">
      <div className="flex flex-row">
        <div className="mx-20 flex flex-1 flex-col">
          <p className="text-4xl">{votesOption1}</p>
          <p className="text-lg uppercase">votes</p>
        </div>

        <div className="flex w-full flex-row bg-gray-500">
          <div
            className="h-full bg-orange-500"
            style={{ width: `${option1RatioPercentage}%` }}
          >
            &nbsp;
          </div>
          <div
            className="h-full bg-green-300"
            style={{ width: `${option2RatioPercentage}%` }}
          >
            &nbsp;
          </div>
        </div>

        <div className="mx-20 flex flex-1 flex-col">
          <p className="text-4xl">{votesOption2}</p>
          <p className="text-lg uppercase">votes</p>
        </div>
      </div>

      <div className="mt-12">
        <PollOptions />
      </div>
    </div>
  )
}

function GoVote(): JSX.Element {
  return (
    <div className="grid rotate-12 place-items-center font-extrabold uppercase">
      <div className="flex flex-row items-center">
        <div className="inline-block w-20 lg:w-32">
          <Image src={handImage} alt="Hand image" />
        </div>
        <span className="text-center text-6xl lg:text-8xl">Go</span>
      </div>
      <span className="text-center text-6xl lg:text-8xl">vote</span>
    </div>
  )
}

function TimeLeft({
  startOfTomorrowUTC,
}: {
  startOfTomorrowUTC: Date
}): JSX.Element {
  return (
    <div>
      <Title>time left</Title>

      <Timer startOfTomorrowUTC={startOfTomorrowUTC} />
    </div>
  )
}
