'use client'

import differenceInHours from 'date-fns/differenceInHours'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import startOfTomorrow from 'date-fns/startOfTomorrow'
import { useEffect, useState } from 'react'

export function Clock(): JSX.Element {
  /** Initialized with null to prevent hydration errors. */
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    function tick() {
      setNow(new Date())
    }

    if (!now) tick()

    let id = setInterval(tick, 1_000)

    return () => clearInterval(id)
  }, [])

  return !now ? <></> : <Diff now={now} />
}

function Diff({ now }: { now: Date }): JSX.Element {
  const tomorrow = startOfTomorrow()

  return (
    <div>
      <p>Tomo: {tomorrow.toISOString()}</p>
      <p>Now: {now.toISOString()}</p>
      <p>Hours: {differenceInHours(tomorrow, now)}</p>
      <p>Minutes: {differenceInMinutes(tomorrow, now) % 60}</p>
      <p>Seconds: {differenceInSeconds(tomorrow, now) % 60}</p>
    </div>
  )
}
