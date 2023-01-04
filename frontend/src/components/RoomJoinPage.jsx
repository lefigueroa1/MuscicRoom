import { useState } from 'react'
import {TextField, Button, Grid, Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import axios from 'axios'

function RoomJoinPage() {
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

  const [roomCode, setRoomCode] = useState("")
  const [error, setError] = useState("")

  const handleTextFieldChange = (e)=>{
    setRoomCode(e.target.value)
  }

  const roomButtonPressed = async()=> {
    let myResponse = await axios.post("/join_room/" , {"code" : roomCode})
    // HFVPRNTV
    
    if (myResponse.data["message"] == "Room Joined!"){
      window.location.href = `/room/${roomCode}`
    }
    else{
      setError('Room Not Found').catch((error) =>{
        console.log(error)
      })
    }
  }

  return (
    <div className="App">
      <h2>hello join page</h2>
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <Typography variant="h4" component='h4'>
            Join a Room
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
        error={error}
        label="Code"
        placeholder="Enter a Room"
        value={roomCode }
        helperText={error}
        variant = "outlined"
        onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant='contained' color="primary" onClick={roomButtonPressed}>Enter Room</Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant ="contained" color='secondary' to="/" component={Link}></Button>
      </Grid>
      
    </div>
  )
}

export default RoomJoinPage