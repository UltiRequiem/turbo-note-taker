"use client";

import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Category, CreateCategoryData } from "@/types";
import clsx from "clsx";

interface CategoryManagerProps {
  categories: Category[];
  onCreateCategory: (data: CreateCategoryData) => void;
  onUpdateCategory: (id: number, data: Partial<CreateCategoryData>) => void;
  onDeleteCategory: (id: number) => void;
  className?: string;
}

const DEFAULT_COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#FF7F50",
  "#87CEEB",
  "#DEB887",
  "#F0E68C",
];

export default function CategoryManager({
  categories,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  className,
}: CategoryManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    color: DEFAULT_COLORS[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      onUpdateCategory(editingId, formData);
      setEditingId(null);
    } else {
      onCreateCategory(formData);
      setShowForm(false);
    }

    setFormData({ name: "", color: DEFAULT_COLORS[0] });
  };

  const handleEdit = (category: Category) => {
    setFormData({ name: category.name, color: category.color });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", color: DEFAULT_COLORS[0] });
  };

  const handleDelete = (category: Category) => {
    if (category.notes_count > 0) {
      if (
        !confirm(
          `This category has ${category.notes_count} notes. Deleting it will remove the category from those notes. Continue?`
        )
      ) {
        return;
      }
    } else if (!confirm(`Delete "${category.name}"?`)) {
      return;
    }

    onDeleteCategory(category.id);
  };

  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Manage Categories</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center rounded border border-transparent bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <PlusIcon className="mr-1 h-4 w-4" />
            New Category
          </button>
        )}
      </div>

      {/* Category Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-lg bg-gray-50 p-4">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Category name"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                    className={clsx(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      formData.color === color
                        ? "scale-110 border-gray-800"
                        : "border-gray-300 hover:scale-105"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <button
              type="submit"
              className="inline-flex items-center rounded border border-transparent bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
            >
              <CheckIcon className="mr-1 h-4 w-4" />
              {editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <XMarkIcon className="mr-1 h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Categories List */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">
            No categories yet. Create your first category to organize your
            notes.
          </p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                  <p className="text-sm text-gray-500">
                    {category.notes_count}{" "}
                    {category.notes_count === 1 ? "note" : "notes"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-gray-400 transition-colors hover:text-blue-600"
                  title="Edit category"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(category)}
                  className="p-2 text-gray-400 transition-colors hover:text-red-600"
                  title="Delete category"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
