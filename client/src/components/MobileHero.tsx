import { Typewriter } from './Typewriter'

interface MobileHeroProps {
  name: string
  subtitlePrefix: string
  subtitleWords: string[]
  onClick?: () => void
}

export function MobileHero({ name, subtitlePrefix, subtitleWords, onClick }: MobileHeroProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full select-none cursor-pointer px-6"
      onClick={onClick}
    >
      <h1
        className="text-5xl sm:text-6xl font-bold text-white tracking-tight text-center"
        style={{ fontFamily: '"Geist", sans-serif' }}
      >
        {name}
      </h1>
      <p
        className="mt-4 text-lg sm:text-xl text-gray-300 text-center"
        style={{ fontFamily: '"Special Elite", sans-serif' }}
      >
        {subtitlePrefix}
        <Typewriter words={subtitleWords} />
      </p>
    </div>
  )
}
