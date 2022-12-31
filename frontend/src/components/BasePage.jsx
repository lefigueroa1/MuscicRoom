import axios from 'axios'
import {Grid, Button, ButtonGroup, Typography} from "@material-ui/core"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

function BasePage({user}) {
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

    //   const [sign, setSign] = useState(false)

    //   const handleSignChange = ()=>{
    //     setSign(true)
    //   }
    //   handleSignChange()

    //   useEffect(()=>{
    //     handleSignChange()
    //   }, [])
    useEffect(()=>{
        if(user){
        window.location.href ="/home"
        // console.log('test')
        }
        }, [user])
    
  return (
    <div>
        {/* {sign && <BasePage2/>} */}
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>
                    <h1>Welcome To Music Room</h1>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant='contained' color="primary">
                    <Button color='primary' to="/signInPage" component={Link}>
                        Sign In
                    </Button>
                    <Button color='secondary' to="/signUpPage" component={Link}>
                        Sign Up
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    </div>
  )
}

export default BasePage