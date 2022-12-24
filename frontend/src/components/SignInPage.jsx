import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

function SignInPage() {
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


      const signIn=async()=>{
        let email = document.getElementById("signInEmail").value
        let password = document.getElementById("signInPassword").value
        let myResponse=await axios.post('signIn/', {'email': email, 'password':password})
        console.log(myResponse.data)
        if (myResponse.data["sign_in"] == true){
            window.location.reload()
          }
      }
      const curr_user= async() =>{
        let myResponse = await axios.get("current_user")
        let user = myResponse.data && myResponse.data[0] && myResponse.data[0].fields
        setUser(user)
      }
      useEffect(()=>{
        curr_user()
      }, [])

      const signOut=async()=>{
        let myResponse=await axios.post('signOut/')
        console.log(myResponse.data)
        if (myResponse.data["SIGN OUT"] == true){
          window.location.reload()
        }
        
      }

  return (
    <div>
        <h1>Music Room Sign In Page</h1>
        {user && <h1>{user.email}</h1>}
        <input id="signInEmail" type="text" placeholder="Email" />
        <br />
        <input id="signInPassword" type="password" 
        placeholder='Password'/>
        <br />
    <button onClick={signIn}>Sign In</button>
    <button onClick={signOut}>Sign Out</button>

    </div>
  )
}

export default SignInPage