import { db } from '@/db/db'
import { Option } from '@/db/schema'
import { OptionVariant } from '@/lib/types'
import { PollOption } from './_components/PollOption'

export async function Poll() {
  const options = await db.getCurrentPoll()
  const option1 = options.option1
  const option2 = options.option2
  const votesOption1 = option1.votes
  const votesOption2 = option2.votes
  const allVotes = votesOption1 + votesOption2

  // option 1's percentage of all votes
  const option1RatioPercentage = Math.round((votesOption1 / allVotes) * 100)
  const option2RatioPercentage = 100 - option1RatioPercentage

  return (
    <div className="flex w-full flex-col text-center">
      <div className="flex flex-row">
        <OptionVotes votes={votesOption1} variant="option1" />

        <div className="flex grow flex-row">
          <div
            className="h-full rounded-l-xl bg-teal-500"
            style={{ width: `${option1RatioPercentage}%` }}
          >
            &nbsp;
          </div>
          <div
            className="h-full rounded-r-xl bg-rose-500"
            style={{ width: `${option2RatioPercentage}%` }}
          >
            &nbsp;
          </div>
        </div>

        <OptionVotes votes={votesOption2} variant="option2" />
      </div>

      <div className="mt-12">
        <PollOptions option1={option1} option2={option2} />
      </div>
    </div>
  )
}

function PollOptions({
  option1,
  option2,
}: {
  option1: Option
  option2: Option
}): JSX.Element {
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <PollOption
        optionId={option1.id}
        variant="option1"
        title={option1.title}
        description={option1.description}
      />

      <p className="mx-10 grid place-items-center font-serif text-6xl">vs.</p>

      <PollOption
        optionId={option2.id}
        variant="option2"
        title={option2.title}
        description={option2.description}
      />
    </div>
  )
}

function OptionVotes({
  votes,
  variant,
}: {
  votes: number
  variant: OptionVariant
}): JSX.Element {
  return (
    <div className="flex basis-52 flex-col">
      <p
        className={`text-5xl ${
          variant === 'option1' ? 'text-teal-500' : 'text-rose-500'
        }`}
      >
        {votes}
      </p>
      <p className="text-lg uppercase">votes</p>
    </div>
  )
}
