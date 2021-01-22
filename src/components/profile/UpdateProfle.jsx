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
const UpdateProfile = (props)=>{
    const classes = useStyles();

    const [name, setName] = useState(props.customer.name)
    const [phone, setPhone] = useState(props.customer.phone)
    const [address, setAddress] = useState(props.customer.address)
    const [city, setCity] = useState(props.customer.city)
    const [zip_code, setZipCode] = useState(props.customer.zip_code)
    const [country, setCountry] = useState(props.customer.country)
    const [company, setCompany] = useState(props.customer.company)
    const [website, setWebsite] = useState(props.customer.website)
   
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)

    const profileHandler = async ()=>{
         try {
            const inputData ={
                name:name ,
                phone :phone,  
                address :address, 
                city: city, 
                zip_code : zip_code, 
                country : country, 
                company : company,  
                website : website
            }
            console.log(inputData)
            const headers = {
                "Content-Type":"application/json",
                "Authorization" :"Bearer "+props.token
            }

            const result = await axios.put(process.env.REACT_APP_BASE_URL+"customer_api/auth/update/" ,inputData  , {headers:headers} )
            if(result.data.error === false){
                setError(false)
                setMessage(result.data.message)
            }
            else{
                setError(true)
                setMessage(result.data.status)
            }
        } catch (error) {
            
        }

    }

    const style={
        width:"70%",
        marginTop:"20px",
        paddingBottm:"20px",
        fontSize:"30px"
    }

    return(
        <div>
            <p className="ProfileTitle" style={{color:"#007bff"}}>Update Profile information</p>
           
            { error && message && <div style={{width:"70%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"red"}}>{message}</div>}
            {  !error && message &&  <div style={{width:"70%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"#007bfc"}}>{message}</div>}
                <br/>

            <TextField 
                variant="outlined" required type="text"  
                onChange={(event)=>setName(event.target.value)}
                label="name"
                defaultValue={props.customer.name}
                InputProps={{ style:{ fontSize:20} }}
                style={style}
            /><br/>
            <TextField 
                variant="outlined" required type="text"  
                onChange={(event)=>setPhone(event.target.value)}
                label="Phone Number"
                defaultValue={props.customer.phone}
                InputProps={{ style:{ fontSize:20} }}
                placeholder="enter phone number"
                style={style}
            /><br/>
            <TextField 
                variant="outlined" required type="text"  
                onChange={(event)=>setAddress(event.target.value)}
                label="Address"
                defaultValue={props.customer.address}
                InputProps={{ style:{ fontSize:20} }}
                placeholder="enter address"
                style={style}
            /><br/><br/>
            <TextField 
                variant="outlined" required type="text"  
                onChange={(event)=>setCity(event.target.value)}
                label="City"
                defaultValue={props.customer.city}
                InputProps={{ style:{ fontSize:25} }}
                placeholder="enter city"
                style={{marginRight:"5%", width:"40%"}}
            />
             <TextField 
                variant="outlined" required type="text"  
                onChange={(event)=>setZipCode(event.target.value)}
                label="Zip Code"
                defaultValue={zip_code}
                InputProps={{ style:{ fontSize:25} }}
                placeholder="enter zip code"
                style={{width:"25%"}}
            />
            <TextField 
                variant="outlined" required type="text"  
                onChange={(event)=>setCountry(event.target.value)}
                label="country"
                defaultValue={props.customer.country}
                InputProps={{ style:{ fontSize:25} }}
                placeholder="Enter country"
                style={style}
            /><br/>
            <TextField 
                variant="outlined" required type="text"  
                onChange={(event)=>setCompany(event.target.value)}
                label="company Name"
                defaultValue={props.customer.company}
                InputProps={{ style:{ fontSize:25} }}
                placeholder="enter company name"
                style={style}
            /><br/>
            <TextField 
                variant="outlined" required type="url"  
                onChange={(event)=>setWebsite(event.target.value)}
                label="website url"
                defaultValue={props.customer.website}
                InputProps={{ style:{ fontSize:25} }}
                placeholder="enter Website url"
                style={style}
            /><br/><br/><br/><br/>
            <Button variant="contained" color="primary" size="large"  className={classes.button}
               onClick={profileHandler}
            >Update Profile
            </Button>

   
        </div>    
    )
}

export default UpdateProfile