const OPTION_VARIANTS = ['option1', 'option2'] as const
export type OptionVariant = (typeof OPTION_VARIANTS)[number]

export function isOptionVariant(optionId: string): optionId is OptionVariant {
  return OPTION_VARIANTS.includes(optionId as OptionVariant)
}
