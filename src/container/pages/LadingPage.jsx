import React from'react'
import './LandingPage.css'
import {Container} from '@material-ui/core'
import {Grid, Button, TextField} from '@material-ui/core'
import { NavLink , useHistory } from 'react-router-dom'
const LandingPage = ()=>{

    const history = useHistory()
    return(

        <div>
            
            <div className="TopSqure"></div>
            <div className="triangleDown"></div>

         

            <Container style={{position:"relative"}}>

             <h2 className="Title">Welcome to Dedicated <br/>server management System</h2><br/><br/>

        
                  <Button onClick={ ()=>history.push('/signup')}
                  style={{padding:"20px 30px", backgroundColor:"white", color:"blue", fontWeight:"bold", fontSize:"20px", textTransform:"none",}}>
                   Create Account 
                </Button>
            
            </Container>
        </div>
    )
}

export default LandingPage