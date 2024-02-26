import NewNoteForm from "../../components/NewNoteForm/NewNoteForm"

export default function NotePage({ notes, handleCreateNote, handleDeleteNote, HandleSort }) {

  return (
    <>
    <h1>Notes</h1>
    <NewNoteForm handleCreateNote={handleCreateNote}/>
    <button onClick={HandleSort}>Sort by Date</button>
    {notes.length ? notes.map((n, idx) => (
      <p key={idx}>{n.text} {new Date(n.createdAt).toLocaleString()} <button onClick={() => handleDeleteNote(n._id)}>X
        </button></p>
    )) : <p>No Notes Yet</p>}
    </>
  )
}