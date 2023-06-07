const OPTION_IDS = ['option1', 'option2'] as const
export type OptionId = (typeof OPTION_IDS)[number]

export function isOptionId(optionId: string): optionId is OptionId {
  return OPTION_IDS.includes(optionId as OptionId)
}
