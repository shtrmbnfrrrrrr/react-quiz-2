import React from "react";
import { HiOutlinePencil, HiCheck } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";

const NoteCell = ({ note, onToggleComplete, onEdit, onDelete }) => {
  return (
    <li className="note-item">
      <label className="note-label">
        <input
          type="checkbox"
          checked={note.complete}
          onChange={() => onToggleComplete(note.id)}
          className="note-checkbox-hidden"
        />

        <span className={`custom-checkbox ${note.complete ? "checked" : ""}`}>
          {note.complete && <HiCheck size={30} color="#fff" />}
        </span>

        <span className={`note-text ${note.complete ? "note-complete" : ""}`}>
          {note.text}
        </span>
      </label>

      <div className="note-actions">
        <button className="edit-btn" title="Edit" onClick={() => onEdit(note)}>
          <HiOutlinePencil size={18} />
        </button>
        <button
          className="delete-btn"
          title="Delete"
          onClick={() => onDelete(note.id)}
        >
          <RiDeleteBinLine size={18} />
        </button>
      </div>
    </li>
  );
};

export default NoteCell;
