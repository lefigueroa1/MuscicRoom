import { useState } from 'react'
import './App.css'
import axios from 'axios'
import RoomJoinPage from './components/RoomJoinPage'
import CreateRoomPage from './components/CreateRoomPage'
import SignUpPage from './components/SignUpPage'
import SignInPage from './components/SignInPage'
import HomePage from './components/HomePage'
import Room from './components/Room'
import { BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom"
import { useEffect } from 'react'






function App() {
  const [user, setUser] = useState(null)
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
  axios.defaults.headers.common["X-CSRFToken"]=csrftoken
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path  = "/" element={<HomePage/>}/>
          <Route path = "/join" element={<RoomJoinPage/>}/>
          <Route path = "/create" element={<CreateRoomPage/>}/>
          <Route path = "/signUpPage" element={<SignUpPage/>}/>
          <Route path = "/signInPage" element={<SignInPage/>}/>
          <Route path = "/room/:roomCode" element={<Room/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
