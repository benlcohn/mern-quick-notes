import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import NotePage from '../NotePage/NotePage';
import * as notesApi from '../../utilities/notes-api'


export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]);
  const [sortOrder, setSortOrder] = useState(false);

  useEffect(() => {
    async function getAllNotes() {
      const allNotes = await notesApi.getNotes()
      setNotes(allNotes);
    } 
    getAllNotes()
  }, []);

  async function handleCreateNote(newNote) {
    const note = await notesApi.createNote(newNote);
    setNotes([...notes, note]);
  };

  async function handleDeleteNote(noteId) {
    const allNotes = await notesApi.deleteNote(noteId);
    setNotes(allNotes);
  }

  async function HandleSort() {
    const sortedNotes = sortOrder ? notes.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
      ) : notes.sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
      ) ;
      setSortOrder(!sortOrder);
      setNotes(sortedNotes);
  }


  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route Complnents in here */}
            <Route path="/" element={<NotePage
            notes={notes}
            handleCreateNote={handleCreateNote}
            HandleSort={HandleSort}
            handleDeleteNote={handleDeleteNote}/>}/>
          </Routes>
        </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
}