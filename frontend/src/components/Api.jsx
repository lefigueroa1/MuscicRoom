import axios from 'axios'
import { useState, useEffect } from 'react'
import {Grid, Button, Typography} from '@material-ui/core'
import SearchBar from "material-ui-search-bar";



function Api() {
    let [itemPicture, setItemPicture] = useState(null)
    let [item, setItem] = useState('')
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

      const formButton=async(e)=>{
        e.preventDefault()
        setItemPicture(true)
        let myResponse=await axios.get(`api/${item}/`)
        console.log('div')
        console.log(myResponse['data']['data']['img'])
        console.log('div')
        setItemPicture(myResponse['data']['data']['img']) 
        
        }

    function handleChange (e){
        console.log(e.target.value)
        setItem(e.target.value)
    }

    
        
  return(
    
        <div>
            
            
            <h1>hello</h1>
            <nav >
                <div>
                    <input  name='item' type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
                        <button onClick={formButton} class="btn btn-outline-success">Search</button>
                  
                    {itemPicture?  <img src={itemPicture}/> : null}
                   
                 </div>
            </nav>
            

        </div>
    )
}

export default Api