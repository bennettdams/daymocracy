import { OptionId, options, polls } from '@/db/schema'
import Database from 'better-sqlite3'
import { eq, sql } from 'drizzle-orm'
import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import 'server-only'

const sqlite = new Database('./src/db/sqlite.db')
const dbInternal: BetterSQLite3Database = drizzle(sqlite)
migrate(dbInternal, { migrationsFolder: 'drizzle' })

export type CurrentPoll = Awaited<ReturnType<typeof db.getCurrentPoll>>

export const db = {
  async getCurrentPoll() {
    const [option1, option2] = dbInternal
      .select()
      .from(polls)
      .leftJoin(options, eq(polls.id, options.pollId))
      .all()

    const poll = option1?.polls

    if (!poll || !option1.options || !option2?.options) {
      throw new Error('No poll or options')
    } else {
      await wait()
      const res = {
        id: poll.id,
        title: poll.title,
        option1: option1.options,
        option2: option2.options,
      }
      return res
    }
  },
  async vote(optionId: OptionId) {
    const statement = sql`update ${options} set ${sql.identifier(
      options.votes.name,
    )} = ${sql.identifier(options.votes.name)} + 1 where ${
      options.id
    } = ${optionId}`

    dbInternal.run(statement)

    await wait()
  },
}

async function wait() {
  return new Promise((r) => setTimeout(r, 500))
}
