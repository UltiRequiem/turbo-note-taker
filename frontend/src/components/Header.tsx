"use client";

import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  onCreateNote: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  onLogout?: () => void;
}

export default function Header({
  onCreateNote,
  searchQuery,
  onSearch,
  onLogout,
}: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <button
            onClick={onCreateNote}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            New Note
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
