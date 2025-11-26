export interface Category {
  id: number
  name: string
  color: string
  notes_count: number
  created_at: string
  updated_at: string
}

export interface Note {
  id: number
  title: string
  content: string
  category: number | null
  category_name: string | null
  category_color: string | null
  priority: 'low' | 'medium' | 'high'
  is_pinned: boolean
  is_archived: boolean
  tags: string
  tag_list: string[]
  created_at: string
  updated_at: string
}

export interface NoteListItem {
  id: number
  title: string
  category: number | null
  category_name: string | null
  category_color: string | null
  priority: 'low' | 'medium' | 'high'
  is_pinned: boolean
  is_archived: boolean
  created_at: string
  updated_at: string
}

export interface CreateNoteData {
  title: string
  content: string
  category?: number | null
  priority?: 'low' | 'medium' | 'high'
  tag_list?: string[]
}

export interface UpdateNoteData {
  title?: string
  content?: string
  category?: number | null
  priority?: 'low' | 'medium' | 'high'
  is_pinned?: boolean
  is_archived?: boolean
  tag_list?: string[]
}

export interface CreateCategoryData {
  name: string
  color?: string
}

export interface NotesStats {
  total_notes: number
  active_notes: number
  pinned_notes: number
  archived_notes: number
  categories_count: number
}