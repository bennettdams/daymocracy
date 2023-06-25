import type { InferModel } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import 'server-only'

export const polls = sqliteTable('polls', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
})

export const options = sqliteTable('options', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  votes: integer('votes', { mode: 'number' }).notNull(),
  pollId: integer('poll_id')
    .notNull()
    .references(() => polls.id, { onDelete: 'cascade' }),
})

export type Poll = InferModel<typeof polls, 'select'>
export type Option = InferModel<typeof options, 'select'>
export type OptionId = Option['id']
