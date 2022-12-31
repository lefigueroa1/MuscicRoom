import axios from 'axios'
import { useState } from 'react'
import {Grid, Button, Typography} from '@material-ui/core'



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
    let code = window.location['href'].split("/").at(-1)
    async function getRoomDetails (){
        fetch('/get_room/' + '?code=' + code).then((response) => response.json()).then((data)=> {
            console.log(data)
            if(data['Room Not Found'] == "Invalid Room Code"){
                window.location.href = '/home'
            }else {console.log('true')}

        })
            // if(response['ok'] == false){
       
            //     window.location.href = '/home'
            // }
            // console.log(response)
            // console.log(response.json())
            // return response.json()
        // })
        // .then((data)=> {
        //     setGuestCanPause(data['guest_can_pause']), 
        //     setVotesToSkip(data['votes_to_skip']), 
        //     setIsHost(data['is_host'])
        // })
    }
    getRoomDetails()

    const leaveButtonPressed =()=> {
        // const requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //   };
        //   fetch("/leave-room/", requestOptions).then((_response) => {
            
        //     window.location.href = '/'
        //   });
        let myResponse = axios.post("/leave_room/")
        console.log(myResponse)
        window.location.href = '/'
    }

        
  
  return (
    
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
                <Button Button color='secondary' variant='contained' onClick={leaveButtonPressed}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
        <h1>Room: {code}</h1>
        <p>Votes: {votesToSkip}</p>
        <p>Guest Can Pause: {guestCanPause.toString()}</p>
        <p>Host: {isHost.toString()}</p>


        </div>
    )
}

export default Room