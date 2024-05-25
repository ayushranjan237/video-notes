import React from 'react';

const NotesList = ({ notes, onDelete, onEdit, onJumpToTime }) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div key={note.id} className="note">
          <p>
            <strong>Timestamp:</strong>
            <button onClick={() => onJumpToTime(note.timestamp)}>
              {note.timestamp}
            </button>
          </p>
          <p><strong>Date:</strong> {new Date(note.date).toLocaleString()}</p>
          <p>{note.content}</p>
          <button onClick={() => onEdit(note.id)}>Edit</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
