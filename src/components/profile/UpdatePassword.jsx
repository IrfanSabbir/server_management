import React , {useState} from 'react'

import {  TextField , Button} from  '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles({
    button:{
        minWidth:"70%",
        textTransform:"none",
        fontSize:"20px",
        backgroundColor:"#007bfc"
    }
  })

const UpdatePassword = (props)=>{
    const classes = useStyles();

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newConfirmPassword, setNewConfirmPassword] = useState("")
   
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)

    const passwordChangeHandler = async ()=>{
        try {
           const inputData ={
            oldPassword,newPassword,newConfirmPassword
           }
           const headers = {
               "Content-Type":"application/json",
               "Authorization" :"Bearer "+props.token
           }

           const result = await axios.put(process.env.REACT_APP_BASE_URL+"customer_api/auth/update_password/" ,inputData  , {headers:headers} )
           console.log(result)
           console.log("here")
           if(result.data.error === false){
               setError(false)
               setMessage(result.data.message)
           }
           else{
               console.log("here 2")
               setError(true)
               setMessage(result.data.message)
           }
        } 
        catch (error) {
           console.log(error)
            setError(true)
            setMessage("something went wrong ! Please check again")
       }

   }

    const style={
        width:"70%",
        marginTop:"20px",
        paddingBottm:"20px",
        fontSize:"30px"
    }
    const button ={
        width:"70%",
        textAlign:"center", 
        padding:"15px 0px", 
        background:"#e5edfc", 
        color:"#007bff", 
        fontSize:"20px",
        textTransform:"none",
        fontWeight:"bold"
    }
    return(
        <div >
               <p className="ProfileTitle" style={{color:"#007bff"}}>Update Profile information</p>
           
           { error && message && <div style={{width:"70%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"red"}}>{message}</div>}
           {  !error && message &&  <div style={{width:"70%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"#007bfc"}}>{message}</div>}
               <br/>
               <TextField 
                variant="outlined" required type="password"  
                onChange={(event)=>setOldPassword(event.target.value)}
                label="old Password"
                InputProps={{ style:{ fontSize:25} }}
                placeholder="enter old password"
                style={style}
            /><br/>
            <TextField 
                variant="outlined" required type="password"  
                onChange={(event)=>setNewPassword(event.target.value)}
                label="new password"
                InputProps={{ style:{ fontSize:25} }}
                placeholder="enter new password"
                style={style}
            /><br/>
               <TextField 
                variant="outlined" required type="password"  
                onChange={(event)=>setNewConfirmPassword(event.target.value)}
                label="confirm Password"
                InputProps={{ style:{ fontSize:25} }}
                placeholder="enter confirm password"
                style={style}
            /><br/><br/><br/>
            <Button variant="contained" color="primary" size="large"  className={classes.button}
               onClick={passwordChangeHandler}
            >Change Password
            </Button>


        </div>    
    )
}

export default UpdatePassword