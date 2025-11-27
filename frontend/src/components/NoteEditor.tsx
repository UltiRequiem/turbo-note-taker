"use client";

import { useState, useEffect } from "react";
import {
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  MapPinIcon,
  ArchiveBoxIcon,
  TagIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { Note, Category } from "@/types";
import { formatFullTimestamp } from "@/lib/dateUtils";
import clsx from "clsx";

interface NoteEditorProps {
  note: Note | null;
  categories: Category[];
  isEditing: boolean;
  onStartEditing: () => void;
  onStopEditing: () => void;
  onUpdateNote: (id: number, updates: Partial<Note>) => Promise<void>;
}

export default function NoteEditor({
  note,
  categories,
  isEditing,
  onStartEditing,
  onStopEditing,
  onUpdateNote,
}: NoteEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setPriority(note.priority);
      setCategoryId(note.category);
      setTags(note.tag_list || []);
    }
  }, [note]);

  const handleSave = async () => {
    if (!note || isSaving) return;

    setIsSaving(true);
    try {
      await onUpdateNote(note.id, {
        title: title?.trim() || "Untitled",
        content: content?.trim() || "",
        priority,
        category: categoryId,
        tag_list: tags,
      });
      onStopEditing();
    } catch (error) {
      console.error("Error saving note:", error);
      // Keep editing mode active on error
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setPriority(note.priority);
      setCategoryId(note.category);
      setTags(note.tag_list || []);
    }
    onStopEditing();
  };

  const addTag = () => {
    const tag = tagInput?.trim();
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!note) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookmarkIcon className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Select a note to view
          </h3>
          <p className="text-gray-500">
            Choose a note from the list or create a new one to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {note.is_pinned && (
                <MapPinIcon className="h-5 w-5 text-blue-500" />
              )}
              {note.is_archived && (
                <ArchiveBoxIcon className="h-5 w-5 text-yellow-500" />
              )}
            </div>

            {note.category_name && (
              <div className="flex items-center space-x-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: note.category_color || "#3B82F6" }}
                />
                <span className="text-sm text-gray-600">
                  {note.category_name}
                </span>
              </div>
            )}

            <div className="text-sm text-gray-500">
              Updated {formatDate(note.updated_at)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center rounded border border-transparent bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckIcon className="mr-1 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <XMarkIcon className="mr-1 h-4 w-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={onStartEditing}
                className="inline-flex items-center rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <PencilIcon className="mr-1 h-4 w-4" />
                Edit
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {isEditing ? (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter note title..."
              />
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={categoryId || ""}
                  onChange={(e) =>
                    setCategoryId(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="">No Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "low" | "medium" | "high")
                  }
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="mb-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-500"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  className="block w-full rounded-l-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Add tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="block w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Start writing your note..."
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="mb-4 text-3xl font-bold text-gray-900">
                {note.title || "Untitled"}
              </h1>

              <div className="mb-6 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <span
                    className={clsx(
                      "font-medium",
                      note.priority === "high"
                        ? "text-red-600"
                        : note.priority === "medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                    )}
                  >
                    {note.priority.toUpperCase()} PRIORITY
                  </span>
                </div>

                {note.tag_list && note.tag_list.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <TagIcon className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1">
                      {note.tag_list.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="prose max-w-none">
              {note.content ? (
                <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
                  {note.content}
                </div>
              ) : (
                <div className="italic text-gray-400">
                  This note is empty. Click Edit to add content.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
