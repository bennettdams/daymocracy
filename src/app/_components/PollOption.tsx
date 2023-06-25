'use client'

import { Title } from '@/components/Title'
import { OptionId } from '@/db/schema'
import { OptionVariant } from '@/lib/types'
import { voteForOption } from '../actions'

export function PollOption({
  optionId,
  variant,
  title,
  description,
}: {
  optionId: OptionId
  variant: OptionVariant
  title: string
  description: string
}): JSX.Element {
  async function handleSubmit() {
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
        <button type="submit">Vote!</button>
      </form>
    </div>
  )
}
