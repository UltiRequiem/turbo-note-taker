import axios from 'axios'
import { Note, Category, CreateNoteData, UpdateNoteData, CreateCategoryData, NotesStats } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get('/categories/')
    return response.data.results || response.data
  },

  getById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}/`)
    return response.data
  },

  create: async (data: CreateCategoryData): Promise<Category> => {
    const response = await api.post('/categories/', data)
    return response.data
  },

  update: async (id: number, data: Partial<CreateCategoryData>): Promise<Category> => {
    const response = await api.patch(`/categories/${id}/`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}/`)
  },
}

// Notes API
export const notesApi = {
  getAll: async (params?: {
    category?: number
    priority?: string
    is_pinned?: boolean
    is_archived?: boolean
    search?: string
    tags?: string
    page?: number
    ordering?: string
  }): Promise<{ results: Note[]; count: number; next: string | null; previous: string | null }> => {
    const response = await api.get('/notes/', { params })
    return response.data
  },

  getById: async (id: number): Promise<Note> => {
    const response = await api.get(`/notes/${id}/`)
    return response.data
  },

  create: async (data: CreateNoteData): Promise<Note> => {
    const response = await api.post('/notes/', data)
    return response.data
  },

  update: async (id: number, data: UpdateNoteData): Promise<Note> => {
    const response = await api.patch(`/notes/${id}/`, data)
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}/`)
  },

  togglePin: async (id: number): Promise<{ id: number; is_pinned: boolean; message: string }> => {
    const response = await api.post(`/notes/${id}/toggle_pin/`)
    return response.data
  },

  toggleArchive: async (id: number): Promise<{ id: number; is_archived: boolean; message: string }> => {
    const response = await api.post(`/notes/${id}/toggle_archive/`)
    return response.data
  },

  getArchived: async (): Promise<{ results: Note[]; count: number }> => {
    const response = await api.get('/notes/archived/')
    return response.data
  },

  getPinned: async (): Promise<Note[]> => {
    const response = await api.get('/notes/pinned/')
    return response.data
  },

  getStats: async (): Promise<NotesStats> => {
    const response = await api.get('/notes/stats/')
    return response.data
  },
}

export default api