import startOfTomorrow from 'date-fns/startOfTomorrow'
import 'server-only'

/** Runs on the server as we assume it brings a UTC date. */
export function getStartOfTomorrowUTC(): Date {
  return startOfTomorrow()
}
