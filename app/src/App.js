import { useState, useEffect} from "react";
import noteService from "./services/notes.js";
import userService from "./services/user.js"
import RenderLogin from './components/render_login.js'
import RenderNoteForm from './components/render_note_form.js'
import './App.css';

function App() {
  const [note, setNote] = useState([]);
  
  const [reload, setReload] = useState(true)
  const [messageError, setMessageError] = useState(null)

 
  const [user, setUser] = useState(null);


  useEffect(() => {
    const userLocalSaved = JSON.parse(window.localStorage.getItem('appUser'))
    if(userLocalSaved){
      userService
      .auth(userLocalSaved.token)
      .then(response => setUser(response.data))
      .catch(e=>{
        setUser(null)
        console.log(e)
      })
    }
  
    noteService
      .getNotes().then((note) => {
      setReload(false)
      setNote(note);
    });
  }, [reload]);


  const addNote = (addNote) => {
      noteService
      .addNote(addNote,user.token).then((response) => {
      setNote((prevNote) => prevNote.concat(response));
    });
    
  };
  
  const handleDelete = (id) =>{
    setReload(true)
    noteService
    .deleteNote(id).then(response=>{
      console.log(response)
    })
  }

  const saveUser = (data) =>{
      setUser(data);
      window.localStorage.setItem('appUser',JSON.stringify(data))
  }

  const handleLogout = () => {
    window.localStorage.setItem('appUser',null)
    setUser('')
    console.log('listo')
   
   
  }
 

  return (
    <div>
      <h2>NOTES</h2>
      <ul>
        {note.map((note) => {
          return (
            <div key={note.id}>
              <li>
                <h4>{note.content}</h4>
                <p>{note.date}</p>
                <button onClick={()=>handleDelete(note.id)}>delete</button>
              </li>
            </div>
          );
        })}
      </ul>
       
        {
          user
          ? <RenderNoteForm
          addNote={addNote}
          handleLogout={handleLogout}
       
            />
          : <RenderLogin 
          saveUser={saveUser}
          userService={userService}
          />
        }
      
    </div>
  );
      };
export default App;
