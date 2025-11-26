'use client'

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Sidebar</h2>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Notes App</h1>
        </header>
        <div className="flex-1 p-6">
          <p className="text-gray-600">Welcome to the notes application!</p>
        </div>
      </div>
    </div>
  )
}