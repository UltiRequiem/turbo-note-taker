"use client";

import {
  FolderIcon,
  InboxIcon,
  ArchiveBoxIcon,
  TagIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Category } from "@/types";
import clsx from "clsx";

interface SidebarProps {
  categories: Category[];
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  showArchived: boolean;
  onToggleArchived: (showArchived: boolean) => void;
  onManageCategories: () => void;
  userEmail?: string;
}

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  showArchived,
  onToggleArchived,
  onManageCategories,
  userEmail,
}: SidebarProps) {
  return (
    <div className="flex w-64 flex-col border-r border-gray-200 bg-white">
      {/* User Info */}
      {userEmail && (
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {userEmail}
              </p>
              <p className="text-xs text-gray-500">Active account</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <nav className="space-y-2">
          {/* All Notes */}
          <button
            onClick={() => {
              onSelectCategory(null);
              onToggleArchived(false);
            }}
            className={clsx(
              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              !selectedCategory && !showArchived
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <InboxIcon className="mr-3 h-5 w-5" />
            All Notes
          </button>

          {/* Archived Notes */}
          <button
            onClick={() => {
              onSelectCategory(null);
              onToggleArchived(true);
            }}
            className={clsx(
              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              showArchived
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <ArchiveBoxIcon className="mr-3 h-5 w-5" />
            Archived
          </button>
        </nav>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="px-4 pb-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Categories
            </h3>
            <button
              onClick={onManageCategories}
              className="p-1 text-gray-400 transition-colors hover:text-gray-600"
              title="Manage categories"
            >
              <Cog6ToothIcon className="h-4 w-4" />
            </button>
          </div>
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onSelectCategory(category.id);
                  onToggleArchived(false);
                }}
                className={clsx(
                  "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  selectedCategory === category.id && !showArchived
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div
                  className="mr-3 h-3 w-3 flex-shrink-0 rounded-full"
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
      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {categories.length} categories
          </div>
          {categories.length === 0 && (
            <button
              onClick={onManageCategories}
              className="text-xs font-medium text-blue-600 hover:text-blue-500"
            >
              Create categories
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
