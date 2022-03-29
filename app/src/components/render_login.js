import {useState} from 'react'
import Togglable from './Togglable.js'
export default function RenderLogin({userService,saveUser, ErrorMessage}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const handleLogin = (event) =>{
        event.preventDefault();
    
        userService
        .login({username, password})
        .then(response=>{
          saveUser(response.data)
        })
        .catch(()=>{
          setUsername('');
          setPassword('');        
        })
      }
    return (<Togglable buttonLabel="Show Login">
      <div>
      <form onSubmit={handleLogin}>  
        <div>
        <input type="text" onChange={(event)=>setUsername(event.target.value)} placeHolder={'username'} value={username}/>
        </div>
        <div>
        <input type="password" onChange={(event)=>setPassword(event.target.value)} placeHolder={'password'} value={password}/>
        </div>
        <button>Login</button>
      </form>
    </div>
    </Togglable>
  
    )
}