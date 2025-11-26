'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

// Simple temporary components to test styling
function TempSidebar() {
  const categories = [
    { id: 1, name: 'Random Thoughts', color: '#FF6B6B', count: 3 },
    { id: 2, name: 'School', color: '#4ECDC4', count: 5 },
    { id: 3, name: 'Personal', color: '#45B7D1', count: 2 },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Categories
        </h3>
        <nav className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              <div
                className="h-3 w-3 rounded-full mr-3 flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="truncate">{category.name}</span>
              <span className="ml-auto text-xs text-gray-500">
                {category.count}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

function TempHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
          <button
            onClick={() => toast.success('New note created!')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            + New Note
          </button>
        </div>
        <div className="relative max-w-md w-full">
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search notes..."
          />
        </div>
      </div>
    </header>
  )
}

function TempNotesList() {
  const notes = [
    {
      id: 1,
      title: 'Welcome to your notes app!',
      content: 'This is your first note. You can edit, categorize, and organize all your thoughts here.',
      category: 'Random Thoughts',
      categoryColor: '#FF6B6B',
      lastEdited: 'today',
    },
    {
      id: 2,
      title: 'Math Homework',
      content: 'Complete chapter 5 exercises 1-20. Remember to review the quadratic formula.',
      category: 'School',
      categoryColor: '#4ECDC4',
      lastEdited: 'yesterday',
    },
    {
      id: 3,
      title: 'Weekend Plans',
      content: 'Visit the farmers market, call mom, finish reading that book.',
      category: 'Personal',
      categoryColor: '#45B7D1',
      lastEdited: 'Nov 24',
    },
  ]

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {notes.length} notes
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {note.title}
                </h3>
                <time className="text-xs text-gray-400 ml-2">
                  {note.lastEdited}
                </time>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {note.content}
              </p>

              <div className="flex items-center space-x-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: note.categoryColor }}
                />
                <span className="text-xs text-gray-500">
                  {note.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TempNoteEditor() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Personal</span>
            </div>
            <div className="text-sm text-gray-500">
              Last edited today at 2:30 PM
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              className="w-full text-2xl font-bold border-0 border-b border-gray-200 focus:border-blue-500 focus:ring-0 px-0"
              placeholder="Note title..."
              defaultValue="Weekend Plans"
            />
            <textarea
              className="w-full min-h-[400px] text-gray-700 border-0 focus:ring-0 resize-none px-0"
              placeholder="Start writing your note..."
              defaultValue="Visit the farmers market, call mom, finish reading that book."
            />
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Weekend Plans
            </h1>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Visit the farmers market, call mom, finish reading that book.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-50">
      <TempSidebar />
      <div className="flex-1 flex flex-col">
        <TempHeader />
        <div className="flex-1 flex">
          <TempNotesList />
          <TempNoteEditor />
        </div>
      </div>
    </div>
  )
}