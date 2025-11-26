'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Note, Category } from '@/types'
import { notesApi, categoriesApi, authApi } from '@/lib/api'
import NotesList from '@/components/NotesList'
import NoteEditor from '@/components/NoteEditor'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import CategoryManager from '@/components/CategoryManager'

export default function DashboardPage() {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [showArchived, setShowArchived] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [userEmail, setUserEmail] = useState<string>('')

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      router.push('/auth/login')
      return
    }
    loadData()
  }, [searchQuery, selectedCategory, showArchived])

  const loadData = async () => {
    try {
      setLoading(true)
      const [notesResponse, categoriesResponse, profileResponse] = await Promise.all([
        notesApi.getAll({
          search: searchQuery || undefined,
          category: selectedCategory || undefined,
          is_archived: showArchived || undefined,
        }),
        categoriesApi.getAll(),
        authApi.getProfile().catch(() => null), // Don't fail if profile fails
      ])

      setNotes(notesResponse.results)
      setCategories(categoriesResponse)
      if (profileResponse) {
        setUserEmail(profileResponse.email)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      // If unauthorized, redirect to login
      if ((error as any)?.response?.status === 401) {
        authApi.logout()
        router.push('/auth/login')
      } else {
        toast.error('Failed to load data')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNote = async () => {
    const newNote = {
      title: 'New Note',
      content: 'Start writing your thoughts here...',
      priority: 'medium' as const,
    }

    try {
      const createdNote = await notesApi.create(newNote)
      setNotes(prev => [createdNote, ...prev])
      setSelectedNote(createdNote)
      setIsEditing(true)
      toast.success('Note created')
    } catch (error) {
      console.error('Error creating note:', error)
      toast.error('Failed to create note')
    }
  }

  const handleUpdateNote = async (id: number, updates: Partial<Note>) => {
    try {
      const updatedNote = await notesApi.update(id, updates)
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note))
      if (selectedNote?.id === id) {
        setSelectedNote(updatedNote)
      }
      toast.success('Note updated')
    } catch (error) {
      console.error('Error updating note:', error)
      toast.error('Failed to update note')
    }
  }

  const handleDeleteNote = async (id: number) => {
    try {
      await notesApi.delete(id)
      setNotes(prev => prev.filter(note => note.id !== id))
      if (selectedNote?.id === id) {
        setSelectedNote(null)
        setIsEditing(false)
      }
      toast.success('Note deleted')
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error('Failed to delete note')
    }
  }

  const handleTogglePin = async (id: number) => {
    try {
      const result = await notesApi.togglePin(id)
      setNotes(prev => prev.map(note =>
        note.id === id ? { ...note, is_pinned: result.is_pinned } : note
      ))
      if (selectedNote?.id === id) {
        setSelectedNote(prev => prev ? { ...prev, is_pinned: result.is_pinned } : null)
      }
      toast.success(result.message)
    } catch (error) {
      console.error('Error toggling pin:', error)
      toast.error('Failed to toggle pin')
    }
  }

  const handleToggleArchive = async (id: number) => {
    try {
      const result = await notesApi.toggleArchive(id)
      const updatedNotes = notes.map(note =>
        note.id === id ? { ...note, is_archived: result.is_archived } : note
      )

      // Remove from current view if archived/unarchived
      if (showArchived !== result.is_archived) {
        setNotes(updatedNotes.filter(note => note.id !== id))
        if (selectedNote?.id === id) {
          setSelectedNote(null)
          setIsEditing(false)
        }
      } else {
        setNotes(updatedNotes)
        if (selectedNote?.id === id) {
          setSelectedNote(prev => prev ? { ...prev, is_archived: result.is_archived } : null)
        }
      }

      toast.success(result.message)
    } catch (error) {
      console.error('Error toggling archive:', error)
      toast.error('Failed to toggle archive')
    }
  }

  const handleCreateCategory = async (data: { name: string; color?: string }) => {
    try {
      const newCategory = await categoriesApi.create(data)
      setCategories(prev => [...prev, newCategory])
      toast.success('Category created')
    } catch (error) {
      console.error('Error creating category:', error)
      toast.error('Failed to create category')
    }
  }

  const handleUpdateCategory = async (id: number, data: { name?: string; color?: string }) => {
    try {
      const updatedCategory = await categoriesApi.update(id, data)
      setCategories(prev => prev.map(cat => cat.id === id ? updatedCategory : cat))
      toast.success('Category updated')
    } catch (error) {
      console.error('Error updating category:', error)
      toast.error('Failed to update category')
    }
  }

  const handleDeleteCategory = async (id: number) => {
    try {
      await categoriesApi.delete(id)
      setCategories(prev => prev.filter(cat => cat.id !== id))
      // If the deleted category was selected, reset selection
      if (selectedCategory === id) {
        setSelectedCategory(null)
      }
      // Reload notes to reflect category changes
      loadData()
      toast.success('Category deleted')
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Failed to delete category')
    }
  }

  const handleLogout = () => {
    authApi.logout()
    router.push('/auth/login')
  }

  // Show empty state for new users
  if (!loading && notes.length === 0 && !searchQuery && !selectedCategory && !showArchived) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            showArchived={showArchived}
            onToggleArchived={setShowArchived}
            onManageCategories={() => setShowCategoryManager(true)}
            userEmail={userEmail}
          />

          <div className="flex-1 flex flex-col">
            <Header
              onCreateNote={handleCreateNote}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              onLogout={handleLogout}
            />

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-8">
                  <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to your notes!
                </h3>
                <p className="text-gray-600 mb-8 max-w-md">
                  Create your first note to start organizing your thoughts and ideas.
                </p>
                <button
                  onClick={handleCreateNote}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Your First Note
                </button>

                <div className="mt-8 text-sm text-gray-500">
                  <p>We've created some default categories for you:</p>
                  <div className="flex justify-center space-x-4 mt-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        showArchived={showArchived}
        onToggleArchived={setShowArchived}
        onManageCategories={() => setShowCategoryManager(true)}
        userEmail={userEmail}
      />

      <div className="flex-1 flex flex-col">
        <Header
          onCreateNote={handleCreateNote}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          onLogout={handleLogout}
        />

        <div className="flex-1 flex">
          <NotesList
            notes={notes}
            loading={loading}
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
            onTogglePin={handleTogglePin}
            onToggleArchive={handleToggleArchive}
            onDeleteNote={handleDeleteNote}
          />

          <NoteEditor
            note={selectedNote}
            categories={categories}
            isEditing={isEditing}
            onStartEditing={() => setIsEditing(true)}
            onStopEditing={() => setIsEditing(false)}
            onUpdateNote={handleUpdateNote}
          />
        </div>
      </div>
    </div>
  )
}