import axios from 'axios'
import { useState } from 'react'
import {Grid, Button, Typography} from '@material-ui/core'
import CreateRoomPage from './CreateRoomPage';



function Room() {
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

    let [guestCanPause, setGuestCanPause] = useState(false);
    let [votesToSkip, setVotesToSkip] = useState(2);
    let [isHost, setIsHost] = useState(false);
    let [showSettings, setShowSettings] = useState(false);
    let [spotifyAuth, setSpotifyAuth] = useState(false);
    let code = window.location['href'].split("/").at(-1)
    async function getRoomDetails (){
        fetch('/get_room/' + '?code=' + code).then((response) => response.json()).then((data)=> {
            console.log(data)
            if(data['Room Not Found'] == "Invalid Room Code"){
                window.location.href = '/home'
            }else {
                setGuestCanPause(data['guest_can_pause']), 
                setVotesToSkip(data['votes_to_skip']), 
                setIsHost(data['is_host'])
            }

        })
        if (isHost){
            authSpotify()
        }
    }
    getRoomDetails()

    function authSpotify(){
        fetch("/is_auth/").then((response) => response.json()).then((data)=>{
            setSpotifyAuth(data['status'])
            console.log('div')
            console.log(data['status'])
            console.log('div2')
            if (!data['status']){
                fetch('/get_auth_url/').then((response) =>response.json()).then((data)=>{
                    window.location.replace(data['url'])
                })
            }
        })
    }

    const leaveButtonPressed =()=> {
        let myResponse = axios.post("/leave_room/")
        console.log(myResponse)
        window.location.href = '/'
    }

    function updateShowSettings(value){
        setShowSettings(value)
    }

    function renderSettings(){
        return(
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <CreateRoomPage 
                        update={true} 
                        votesToSkip={votesToSkip} 
                        guestCanPause={guestCanPause}
                        roomCode={code}
                        test="test"
                        />            
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                        variant='contained'
                        color='secondary'
                        onClick={() => updateShowSettings(false)}>Close</Button>
                    </Grid>
                </Grid>
            
            </div>)
    }

     function renderSettingsButton(){
        return (
            <div>
                
                <Button variant ='contained' color='primary' onClick={()=> updateShowSettings(true)}>Settings</Button>
              
            </div>
        )
     }
  if (showSettings){
    return renderSettings()
  }
  return(
    
    <div>
        <Grid container spacing={1}>
            <Grid items xs={12}>
                <Typography variant="h4" component="h4">
                    Code : {code}
                </Typography>
            </Grid>
            <Grid items xs={12}>
                <Typography variant="h4" component="h4">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid items xs={12}>
                <Typography variant="h4" component="h4">
                    Host: {isHost}
                </Typography>
            </Grid>
            <Grid items xs={12}>
                {isHost ? renderSettingsButton():null}
            </Grid>
            
            <Grid items xs={12}>
                <Button Button color='secondary' variant='contained' onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>


        </div>
    )
}

export default Room