import type { ReactNode } from 'react'

export function Title({ children }: { children: ReactNode }): JSX.Element {
  return (
    <h1 className="text-center text-5xl font-extrabold uppercase">
      {children}
    </h1>
  )
}
