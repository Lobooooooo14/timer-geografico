import Timer from "@/components/timer"

function App() {
  return (
    <main className="min-h-screen bg-meiaum-black text-white tracking-wide">
      <div className="space-y-2 p-2 h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl sm:text-4xl font-normal text-center">
          O Timer Geográfico.
        </h1>
        <p className="font-extralight text-center text-xs sm:text-lg">
          O tempo restante para a live do{" "}
          <a
            href="https://twitch.com/omeiaum"
            target="_blank"
            rel="noreferrer"
            className="text-meiaum-yellow hover:underline"
          >
            meiaum
          </a>{" "}
          acabar, usando imagens de satélite.
        </p>

        <Timer />
      </div>
      <footer className="absolute bottom-0 font-sans p-2 flex flex-col gap-1 items-center w-full text-xs font-light">
        <p>
          Baseado no{" "}
          <a href="https://earthclock.cwandt.com/" className="hover:underline">
            Earth Clock
          </a>
          .
        </p>
        <p>
          Criado por{" "}
          <a
            href="https://github.com/Lobooooooo14/timer-geografico"
            className="hover:underline"
          >
            Lobo
          </a>
          .
        </p>
      </footer>
    </main>
  )
}

export default App
