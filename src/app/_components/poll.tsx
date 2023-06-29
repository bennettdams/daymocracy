'use client'

import { Title } from '@/components/Title'
import { CurrentPoll } from '@/db/db'
import { OptionId } from '@/db/schema'
import { OptionVariant } from '@/lib/types'
import { experimental_useOptimistic as useOptimistic } from 'react'
import { voteForOption } from '../actions'

export function Poll({ currentPoll }: { currentPoll: CurrentPoll }) {
  const option1 = currentPoll.option1
  const option2 = currentPoll.option2
  const votesOption1Server = option1.votes
  const votesOption2Server = option2.votes

  const [votesOption1Optimistic, voteOption1Optimistically] = useOptimistic({
    votesOption1Server,
    isSending: false,
  })
  const [votesOption2Optimistic, voteOption2Optimistically] = useOptimistic({
    votesOption2Server,
    isSending: false,
  })

  function voteOptimistically(optionVariant: OptionVariant) {
    switch (optionVariant) {
      case 'option1': {
        voteOption1Optimistically((state) => ({
          ...state,
          votesOption1Server: state.votesOption1Server + 1,
          isSending: true,
        }))

        break
      }
      case 'option2': {
        voteOption2Optimistically((state) => ({
          ...state,
          votesOption2Server: state.votesOption2Server + 1,
          isSending: true,
        }))

        break
      }
    }
  }

  const votesOption1 = votesOption1Optimistic.votesOption1Server
  const votesOption2 = votesOption2Optimistic.votesOption2Server
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
        <div className="flex w-full flex-col lg:flex-row">
          <PollOption
            optionId={option1.id}
            variant="option1"
            title={option1.title}
            description={option1.description}
            onVote={() => voteOptimistically('option1')}
            isSending={votesOption1Optimistic.isSending}
          />

          <p className="mx-10 grid place-items-center font-serif text-6xl">
            vs.
          </p>

          <PollOption
            optionId={option2.id}
            variant="option2"
            title={option2.title}
            description={option2.description}
            onVote={() => voteOptimistically('option2')}
            isSending={votesOption2Optimistic.isSending}
          />
        </div>
      </div>
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

function PollOption({
  optionId,
  variant,
  title,
  description,
  onVote,
  isSending,
}: {
  optionId: OptionId
  variant: OptionVariant
  title: string
  description: string
  onVote: () => void
  isSending: boolean
}): JSX.Element {
  async function handleSubmit() {
    onVote()
    await voteForOption(optionId)
  }

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

      <form action={handleSubmit}>
        <button type="submit">
          {!isSending ? 'Vote!' : 'Going to ballot..'}
        </button>
      </form>
    </div>
  )
}
