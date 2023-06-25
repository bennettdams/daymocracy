'use server'

import { db } from '@/db/db'
import type { OptionId } from '@/db/schema'
import { revalidatePath } from 'next/cache'

export async function voteForOption(optionId: OptionId) {
  await db.vote(optionId)
  revalidatePath('/')
}
