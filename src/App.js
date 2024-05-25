import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import './index.css';

const App = () => {
  // Initialize videoId from localStorage or use a default value
  const initialVideoId = localStorage.getItem('videoId') || 'pg19Z8LL06w';
  const [videoId, setVideoId] = useState(initialVideoId);
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const youtubePlayerRef = useRef(null);

  useEffect(() => {
    // Load notes from localStorage for the current videoId
    const savedNotes = JSON.parse(localStorage.getItem(`notes-${videoId}`)) || [];
    setNotes(savedNotes);
  }, [videoId]);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    const player = youtubePlayerRef.current.getInternalPlayer();
    const currentTime = await player.getCurrentTime();
    const newNote = {
      timestamp: Math.floor(currentTime),
      content: noteContent,
      date: new Date().toLocaleString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setNoteContent('');
    // Save notes to localStorage
    localStorage.setItem(`notes-${videoId}`, JSON.stringify(updatedNotes));
  };

  const handleNoteDelete = (index) => {
    const updatedNotes = notes.filter((_, noteIndex) => noteIndex !== index);
    setNotes(updatedNotes);
    // Save updated notes to localStorage
    localStorage.setItem(`notes-${videoId}`, JSON.stringify(updatedNotes));
  };

  const jumpToTimestamp = (timestamp) => {
    const player = youtubePlayerRef.current.getInternalPlayer();
    player.seekTo(timestamp);
    player.playVideo();
  };

  const handleVideoIdChange = (e) => {
    const newVideoId = e.target.value;
    setVideoId(newVideoId);
    // Save the new videoId to localStorage
    localStorage.setItem('videoId', newVideoId);
  };

  return (
    <div className="container">
      <header>
        <h1>Video Player with Notes</h1>
      </header>
      <div className="video-input">
        <input
          type="text"
          placeholder="Enter YouTube Video ID"
          value={videoId}
          onChange={handleVideoIdChange}
        />
      </div>
      <div className="video-container">
        <YouTube videoId={videoId} ref={youtubePlayerRef} />
      </div>
      <form onSubmit={handleNoteSubmit}>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Add a note..."
          rows="4"
        ></textarea>
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-container">
        <h2>Notes</h2>
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <p className="timestamp" onClick={() => jumpToTimestamp(note.timestamp)}>
              {new Date(note.timestamp * 1000).toISOString().substr(11, 8)}
            </p>
            <p>{note.content}</p>
            <p>{note.date}</p>
            <div className="actions">
              <button onClick={() => handleNoteDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
