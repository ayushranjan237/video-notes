import React, { useState, useEffect } from 'react';

const NoteForm = ({ currentNote, onSave }) => {
  const [content, setContent] = useState('');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (currentNote) {
      setContent(currentNote.content);
      setTimestamp(currentNote.timestamp);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ content, timestamp });
    setContent('');
    setTimestamp('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Timestamp"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        required
      />
      <textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;
