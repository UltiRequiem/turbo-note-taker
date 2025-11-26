"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Note, Category } from "@/types";
import { notesApi, categoriesApi } from "@/lib/api";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    loadData();
  }, [searchQuery, selectedCategory, showArchived]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [notesResponse, categoriesResponse] = await Promise.all([
        notesApi.getAll({
          search: searchQuery || undefined,
          category: selectedCategory || undefined,
          is_archived: showArchived || undefined,
        }),
        categoriesApi.getAll(),
      ]);

      setNotes(notesResponse.results);
      setCategories(categoriesResponse);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async () => {
    const newNote = {
      title: "New Note",
      content: "",
      priority: "medium" as const,
    };

    try {
      const createdNote = await notesApi.create(newNote);
      setNotes((prev) => [createdNote, ...prev]);
      setSelectedNote(createdNote);
      setIsEditing(true);
      toast.success("Note created");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    }
  };

  const handleUpdateNote = async (id: number, updates: Partial<Note>) => {
    try {
      const updatedNote = await notesApi.update(id, updates);
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? updatedNote : note))
      );
      if (selectedNote?.id === id) {
        setSelectedNote(updatedNote);
      }
      toast.success("Note updated");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await notesApi.delete(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      if (selectedNote?.id === id) {
        setSelectedNote(null);
        setIsEditing(false);
      }
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleTogglePin = async (id: number) => {
    try {
      const result = await notesApi.togglePin(id);
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, is_pinned: result.is_pinned } : note
        )
      );
      if (selectedNote?.id === id) {
        setSelectedNote((prev) =>
          prev ? { ...prev, is_pinned: result.is_pinned } : null
        );
      }
      toast.success(result.message);
    } catch (error) {
      console.error("Error toggling pin:", error);
      toast.error("Failed to toggle pin");
    }
  };

  const handleToggleArchive = async (id: number) => {
    try {
      const result = await notesApi.toggleArchive(id);
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, is_archived: result.is_archived } : note
      );

      // Remove from current view if archived/unarchived
      if (showArchived !== result.is_archived) {
        setNotes(updatedNotes.filter((note) => note.id !== id));
        if (selectedNote?.id === id) {
          setSelectedNote(null);
          setIsEditing(false);
        }
      } else {
        setNotes(updatedNotes);
        if (selectedNote?.id === id) {
          setSelectedNote((prev) =>
            prev ? { ...prev, is_archived: result.is_archived } : null
          );
        }
      }

      toast.success(result.message);
    } catch (error) {
      console.error("Error toggling archive:", error);
      toast.error("Failed to toggle archive");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        showArchived={showArchived}
        onToggleArchived={setShowArchived}
      />

      <div className="flex flex-1 flex-col">
        <Header
          onCreateNote={handleCreateNote}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />

        <div className="flex flex-1">
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
  );
}
