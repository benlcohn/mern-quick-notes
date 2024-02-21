export default function NotesPage({ notes }) {
    return (
        <>
        <h1>Notes</h1>
        {notes.length > 0 ? notes.map((m, idx) => (
            <p key={idx}>{m.createdAt.toLocaleString()}</p>
        )) : <p>No notes yet!</p>}
        </>
    )
}