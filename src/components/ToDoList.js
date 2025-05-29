import React, { useState } from "react";
import NoteCell from "./NoteCell";
import NoteModal from "./NewNote";
import SearchWrapper from "./SearchWrapper";
import UndoButton from "./UndoButton";

const TodoList = () => {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyDeleted, setRecentlyDeleted] = useState([]);

  const toggleComplete = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, complete: !note.complete } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, deleting: true } : note))
    );

    const index = notes.findIndex((n) => n.id === id);
    const note = notes[index];

    const timer = setTimeout(() => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      setRecentlyDeleted((prev) =>
        prev.filter((entry) => entry.note.id !== id)
      );
    }, 30000);

    setRecentlyDeleted((prev) => [...prev, { note, index, timer }]);
  };

  const handleUndo = (id) => {
    const entry = recentlyDeleted.find((entry) => entry.note.id === id);
    if (!entry) return;

    clearTimeout(entry.timer);

    setNotes((prev) =>
      prev.map((note) =>
        note.id === entry.note.id ? { ...note, deleting: false } : note
      )
    );

    setRecentlyDeleted((prev) => prev.filter((entry) => entry.note.id !== id));
  };

  const addNote = (text) => {
    const newNote = { id: Date.now(), text, complete: false };
    setNotes((prev) => [...prev, newNote]);
  };

  const updateNote = (id, newText) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setNoteToEdit(null);
    setModalOpen(false);
  };

  const handleModalSubmit = (text) => {
    if (noteToEdit) {
      updateNote(noteToEdit.id, text);
    } else {
      addNote(text);
    }
    handleModalClose();
  };

  const filteredNotes = notes
    .map((note, index) => ({ note, index }))
    .filter(({ note }) => {
      const matchesFilter =
        filter === "All" ||
        (filter === "Complete" && note.complete) ||
        (filter === "Incomplete" && !note.complete);

      const matchesSearch = note.text
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });

  return (
    <>
      <SearchWrapper
        filter={filter}
        onChangeFilter={setFilter}
        searchQuery={searchQuery}
        onChangeSearch={(e) => setSearchQuery(e.target.value)}
      />

      <div className="todo-wrapper">
        <button className="add-button" onClick={() => setModalOpen(true)}>
          +
        </button>

        {modalOpen && (
          <NoteModal
            initialText={noteToEdit?.text || ""}
            title={noteToEdit ? "Edit Note" : "New Note"}
            onSubmit={handleModalSubmit}
            onClose={handleModalClose}
          />
        )}

        {filteredNotes.length === 0 && recentlyDeleted.length === 0 ? (
          <div className="no-notes">
            <img
              src="noNotes.png"
              className="no-notes-image light-mode"
              alt="No notes"
            />
            <img
              src="noNotesDark.png"
              className="no-notes-image dark-mode"
              alt="No notes"
            />
            <h3>Empty...</h3>
          </div>
        ) : (
          <ul className="notes-list">
            {notes.map((note, index) => {
              const undoEntry = recentlyDeleted.find(
                (entry) => entry.index === index
              );

              if (undoEntry) {
                return (
                  <li key={`undo-${undoEntry.note.id}`} className="undo-slot">
                    <UndoButton onUndo={() => handleUndo(undoEntry.note.id)} />
                  </li>
                );
              }

              if (note.deleting) return null;

              return (
                <NoteCell
                  key={note.id}
                  note={note}
                  onToggleComplete={toggleComplete}
                  onEdit={handleEdit}
                  onDelete={deleteNote}
                />
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default TodoList;
