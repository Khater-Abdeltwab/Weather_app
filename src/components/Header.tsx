function Header() {
    return (
      <header className="flex flex-col items-center text-center gap-4 w-full max-w-xl mx-auto">
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl rounded-full bg-blue-50 p-4 shadow-sm select-none">🌦️</div>
          <div className="p-4">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Weather Dashboard</h1>
            <p className="text-lg text-gray-500 mt-2 max-w-xl mx-auto">
              Real-time weather updates every 15 seconds for your favorite cities
            </p>
          </div>
        </div>
        <div className="text-sm font-semibold tracking-wider uppercase rounded-full bg-red-50 text-red-600 py-1.5 px-4 border border-red-200 shadow-sm animate-pulse flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          Live
        </div>
      </header>
    )
}

export default Header