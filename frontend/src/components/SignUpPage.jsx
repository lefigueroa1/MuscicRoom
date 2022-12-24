import axios from 'axios'



function SignUpPage() {
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


      const signUp=async()=>{
        let firstName = document.getElementById("signUpFirstName").value
        let lastName = document.getElementById("signUpLastName").value
        let email = document.getElementById("signUpEmail").value
        let password = document.getElementById("signUpPassword").value
        // console.log(firstName, lastName, email, password)
        let myResponse=await axios.post('signUp/',{'firstName': firstName, 'lastName': lastName, 'email': email, 'password':password})
        console.log('This is myResponse.data:', myResponse.data)
        if (myResponse.data["sign_up"] == true){
            window.location.href = "/"
          }
      }

  return (
    <div>
     <h1>Music Room Sign Up Page</h1>

     
    <input id="signUpFirstName" type="text" placeholder='First Name' />
    <br />
    <input id="signUpLastName" type="text" placeholder='Last Name' />
    <br />
    <input id="signUpEmail" type="email" placeholder='Email'/>
    <br />
    <input id="signUpPassword" type="password" placeholder='Password'/>
    <br />
    <button onClick={signUp}>Submit</button>

    </div>
  )
}

export default SignUpPage