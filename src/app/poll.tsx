import { Title } from '@/components/Title'
import { Option, fetchCurrentPoll } from '@/lib/api'

export async function Poll() {
  const options = await fetchCurrentPoll()
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
        title={option1.title}
        description={option1.description}
        variant="option1"
      />

      <p className="mx-10 grid place-items-center font-serif text-6xl">vs.</p>

      <PollOption
        title={option2.title}
        description={option2.description}
        variant="option2"
      />
    </div>
  )
}

function PollOption({
  title,
  description,
  variant,
}: {
  title: string
  description: string
  variant: 'option1' | 'option2'
}): JSX.Element {
  return (
    <div
      className={`pg:p-10 flex-1 space-y-4 rounded-lg bg-indigo-100 p-6 text-center ${
        variant === 'option1' ? 'text-teal-500' : 'text-rose-500'
      }`}
    >
      <Title>{title}</Title>

      <div>{description}</div>

      <div className="grid w-full place-items-center bg-red-200">
        <div className="h-44 w-44 bg-blue-200">image</div>
      </div>
    </div>
  )
}

function OptionVotes({
  votes,
  variant,
}: {
  votes: number
  variant: 'option1' | 'option2'
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
