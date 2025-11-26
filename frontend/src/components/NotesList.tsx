"use client";

import { useState } from "react";
import {
  MapPinIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon as MapPinIconSolid } from "@heroicons/react/24/solid";
import { Note } from "@/types";
import clsx from "clsx";

interface NotesListProps {
  notes: Note[];
  loading: boolean;
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onTogglePin: (noteId: number) => void;
  onToggleArchive: (noteId: number) => void;
  onDeleteNote: (noteId: number) => void;
}

export default function NotesList({
  notes,
  loading,
  selectedNote,
  onSelectNote,
  onTogglePin,
  onToggleArchive,
  onDeleteNote,
}: NotesListProps) {
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  if (loading) {
    return (
      <div className="w-80 border-r border-gray-200 bg-white p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-80 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {notes.length} notes
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mb-4 text-gray-400">
              <ClockIcon className="mx-auto h-12 w-12" />
            </div>
            <p className="text-gray-500">No notes found</p>
            <p className="mt-1 text-sm text-gray-400">
              Create your first note to get started
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notes.map((note) => (
              <div
                key={note.id}
                className={clsx(
                  "relative cursor-pointer p-4 transition-colors hover:bg-gray-50",
                  selectedNote?.id === note.id &&
                    "border-r-2 border-blue-500 bg-blue-50"
                )}
                onClick={() => onSelectNote(note)}
                onMouseEnter={() => setHoveredNote(note.id)}
                onMouseLeave={() => setHoveredNote(null)}
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center space-x-2">
                      {note.is_pinned && (
                        <MapPinIconSolid className="h-4 w-4 text-blue-500" />
                      )}
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {note.title || "Untitled"}
                      </h3>
                    </div>

                    <p className="mb-2 line-clamp-2 text-sm text-gray-600">
                      {note.content || "No content"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {note.category_name && (
                          <div className="flex items-center space-x-1">
                            <div
                              className="h-2 w-2 rounded-full"
                              style={{
                                backgroundColor:
                                  note.category_color || "#3B82F6",
                              }}
                            />
                            <span className="text-xs text-gray-500">
                              {note.category_name}
                            </span>
                          </div>
                        )}
                        <div
                          className={clsx(
                            "text-xs font-medium",
                            getPriorityColor(note.priority)
                          )}
                        >
                          {note.priority.toUpperCase()}
                        </div>
                      </div>

                      <time className="text-xs text-gray-400">
                        {formatDate(note.updated_at)}
                      </time>
                    </div>

                    {note.tag_list && note.tag_list.length > 0 && (
                      <div className="mt-2 flex items-center space-x-1">
                        <TagIcon className="h-3 w-3 text-gray-400" />
                        <div className="flex flex-wrap gap-1">
                          {note.tag_list.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                          {note.tag_list.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{note.tag_list.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {hoveredNote === note.id && (
                    <div className="ml-2 flex flex-col space-y-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePin(note.id);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-500"
                        title={note.is_pinned ? "Unpin note" : "Pin note"}
                      >
                        <MapPinIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleArchive(note.id);
                        }}
                        className="p-1 text-gray-400 hover:text-yellow-500"
                        title={
                          note.is_archived ? "Unarchive note" : "Archive note"
                        }
                      >
                        <ArchiveBoxIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            confirm(
                              "Are you sure you want to delete this note?"
                            )
                          ) {
                            onDeleteNote(note.id);
                          }
                        }}
                        className="p-1 text-gray-400 hover:text-red-500"
                        title="Delete note"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
