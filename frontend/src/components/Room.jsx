import axios from 'axios'
import { useState } from 'react'



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
    const getRoomDetails =()=>{
        fetch('/get_room/' + '?code=' + code).then((response) => response.json()).then((data)=> {
            console.log(data)
            console.log(data['guest_can_pause'])
            console.log(data['votes_to_skip'])
            console.log(typeof data['host'])
            setGuestCanPause(data['guest_can_pause']), 
            setVotesToSkip(data['votes_to_skip']), 
            setIsHost(data['is_host'])
        })
    }
    getRoomDetails()
  
  return (
    
        <div>
            
        <h1>Room: {code}</h1>
        <p>Votes: {votesToSkip}</p>
        <p>Guest Can Pause: {guestCanPause.toString()}</p>
        <p>Host: {isHost.toString()}</p>


        </div>
    )
}

export default Room