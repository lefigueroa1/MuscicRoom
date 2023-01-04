import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core"
import { Link } from 'react-router-dom'
function HomePage() {

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
// --------------------------------------------------------------------------
    // let [roomCode, setRoomCode] = useState(null);
    async function componentDidMount() {
        fetch("/user_in_room/")
        .then((response) => response.json())
        .then((data) => {
            let code = data['code'] 
            fetch('/get_room/' + '?code=' + code).then((response) => response.json())
            .then((data) =>{
                console.log(data)
                if(data["Room Not Found"]== "Invalid Room Code"){
                    let code = null
                }else{
                    window.location.href = `/room/${code}`
                }
            })
        })
    }
componentDidMount()
const signOut=async()=>{
    let myResponse=await axios.post('signOut/')
    console.log(myResponse.data)
    if (myResponse.data["SIGN OUT"] == true){
      window.location.href = '/'
    }
    
  }



      
  return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>
                    <h1>Music Room</h1>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant='contained' color="primary">
                    <Button color='primary' to="/join" component={Link}>
                        Join A Room
                    </Button>
                    <Button color='secondary' to="/create" component={Link}>
                        Create A Room
                    </Button>
                    <Button color='secondary' onClick={signOut}>
                        Log Off
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    </div>
  )
}

export default HomePage