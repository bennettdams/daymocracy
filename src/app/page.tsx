import { Clock as Timer } from './Timer'

export default function Home() {
  return (
    <main className="flex h-screen min-h-screen flex-col items-center justify-between bg-indigo-950 p-24 text-white">
      <h1>Daymocracy</h1>
      <p>Vote now!</p>

      <Timer />

      <div className="flex flex-row">
        <div className="w-16 flex-1 bg-white">asd</div>
        <div className="w-16 flex-1 bg-white">asd</div>
      </div>
    </main>
  )
}
