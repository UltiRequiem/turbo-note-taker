'use client'

import {
  FolderIcon,
  InboxIcon,
  ArchiveBoxIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import { Category } from '@/types'
import clsx from 'clsx'

interface SidebarProps {
  categories: Category[]
  selectedCategory: number | null
  onSelectCategory: (categoryId: number | null) => void
  showArchived: boolean
  onToggleArchived: (showArchived: boolean) => void
}

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  showArchived,
  onToggleArchived,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <nav className="space-y-2">
          {/* All Notes */}
          <button
            onClick={() => {
              onSelectCategory(null)
              onToggleArchived(false)
            }}
            className={clsx(
              'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              !selectedCategory && !showArchived
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            <InboxIcon className="h-5 w-5 mr-3" />
            All Notes
          </button>

          {/* Archived Notes */}
          <button
            onClick={() => {
              onSelectCategory(null)
              onToggleArchived(true)
            }}
            className={clsx(
              'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              showArchived
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            )}
          >
            <ArchiveBoxIcon className="h-5 w-5 mr-3" />
            Archived
          </button>
        </nav>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="px-4 pb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Categories
          </h3>
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelectCategory(category.id)
                  onToggleArchived(false)
                }}
                className={clsx(
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  selectedCategory === category.id && !showArchived
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <div
                  className="h-3 w-3 rounded-full mr-3 flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <span className="truncate">{category.name}</span>
                <span className="ml-auto text-xs text-gray-500">
                  {category.notes_count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          {categories.length} categories
        </div>
      </div>
    </div>
  )
}