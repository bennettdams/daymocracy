import { Title } from '@/components/Title'
import { db } from '@/db/db'
import { getStartOfTomorrowUTC } from '@/lib/server-utils'
import Image from 'next/image'
import { Suspense } from 'react'
import handImage from '../../public/assets/hand.png'
import { Timer } from './_components/Timer'
import { Poll } from './_components/poll'

export default async function Home(): Promise<JSX.Element> {
  const startOfTomorrowUTC = getStartOfTomorrowUTC()
  const currentPoll = await db.getCurrentPoll()

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
        <Suspense fallback={<p>Loading poll...</p>}>
          <Poll currentPoll={currentPoll} />
        </Suspense>
      </div>

      <div className="mt-10 lg:mt-20">
        <Title>Previous polls</Title>
      </div>
    </main>
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
    // The height here matches needs to be aligned with the implicit height of a title and the timer text.
    <div className="h-40">
      <Title>time left</Title>

      <Timer startOfTomorrowUTC={startOfTomorrowUTC} />
    </div>
  )
}
