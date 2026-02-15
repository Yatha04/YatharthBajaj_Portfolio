export function Videos() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black px-8">
      <div className="text-center max-w-5xl">
        <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold leading-none mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
          You made it!
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
          While the previous page was technically my portfolio, this page is just more about me. Hope you like it!
        </p>
      </div>
    </div>
  )
}

