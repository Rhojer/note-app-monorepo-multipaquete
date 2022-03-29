import {useState} from "react"

export default function RenderdNoteForm ({ handleLogout, addNote}){
  const [newNote, setNewNote] = useState("")
 
  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const addNewNote = {
      content: newNote,
      
    };
    addNote(addNewNote)
    setNewNote('')
  }
    return(
        <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder={'write note'} value={newNote}/>
        <button>Add</button>
      </form>
      <button onClick={handleLogout}>LogOut</button>
    </div>
    )
}