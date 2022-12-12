import { useState } from 'react'
import './App.css'
import RoomJoinPage from './components/RoomJoinPage'
import CreateRoomPage from './components/CreateRoomPage'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"





function App() {
  
  return (
    <div className="App">
      

      <Router>
        <Routes>
          <Route path  = "/" element={<h1>This is my home page</h1>}></Route>
          <Route path = "/join" element={<RoomJoinPage/>}/>
          <Route path = "/create" element={<CreateRoomPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
