import React, { Component } from "react";
import {Grid,Typography,Card,IconButton,LinearProgress,} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import axios from 'axios'




function MusicPlayer(props) {
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

    // function pauseSong(){
    //     fetch("/pause/" )
    // }
    // function playSong(){
    //     fetch("/play/")
    // }
    // function pauseSong(){
    //     const requestOptions = {
    //         method: "PUT",
    //         headers: {'Content-Type':"application/json"}
    //     }
    //     fetch("/pause/", requestOptions)
    // }
    const pauseSong=async()=>{
        let myResponse=await axios.put('/pause/')
        console.log(myResponse.data)
        // if (myResponse.data["SIGN OUT"] == true){
        //   window.location.href = '/'
        // }
        
      }
    
    const playSong=async()=>{
        let myResponse=await axios.put('/play/')
        console.log(myResponse.data)
    
    }

    const skipSong=async()=>{
        let myResponse=await axios.post('/skip/')
        console.log(myResponse.data)
    
    }


    const songProgress = (props.time / props.duration) * 100;
  return(
    
    <div>
        <Card>
            <Grid container alignItems="center">
            <Grid item align="center" xs={4}>
                <img src={props.image_url} height="100%" width="100%" />
            </Grid>
            <Grid item align="center" xs={8}>
                <Typography component="h5" variant="h5">
                {props.title}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                {props.artist}
                </Typography>
                <div>
                <IconButton onClick={()=> props.is_playing ? pauseSong(): playSong()}>
                    {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton onClick={()=> skipSong()}>
                    <SkipNextIcon />
                </IconButton>
                </div>
            </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    </div>
    )
}

export default MusicPlayer