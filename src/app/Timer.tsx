'use client'

import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import { useEffect, useState } from 'react'

export function Timer({
  startOfTomorrowUTC,
}: {
  startOfTomorrowUTC: Date
}): JSX.Element {
  /** Initialized with null to prevent hydration errors. */
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    function tick() {
      setNow(new Date())
    }

    if (!now) tick()

    const intervalId = setInterval(tick, 1_000)

    return () => clearInterval(intervalId)
  }, [])

  return !now ? (
    <></>
  ) : (
    <Diff now={now} startOfTomorrowUTC={startOfTomorrowUTC} />
  )
}

function Diff({
  now,
  startOfTomorrowUTC,
}: {
  now: Date
  startOfTomorrowUTC: Date
}): JSX.Element {
  const hoursLeft = differenceInHours(startOfTomorrowUTC, now)
  const minutesLeft = differenceInMinutes(startOfTomorrowUTC, now) % 60
  const secondsLeft = differenceInSeconds(startOfTomorrowUTC, now) % 60

  return (
    <div className="flex py-10 text-center">
      <div className="flex flex-1 flex-col">
        <p className="text-5xl">{hoursLeft}</p>
        <p className="text-xl uppercase">hours</p>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-5xl">{minutesLeft}</p>
        <p className="text-xl uppercase">minutes</p>
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-5xl">{secondsLeft}</p>
        <p className="text-xl uppercase">seconds</p>
      </div>
    </div>
  )
}
