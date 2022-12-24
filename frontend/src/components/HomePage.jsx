import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

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


      
  return (
    <div>
        <h1>Music Room Home Page</h1>
        <h3><a href="/signUpPage">Sign Up</a></h3>
        <h3><a href="/signInPage">Sign In</a></h3>
        

    </div>
  )
}

export default HomePage