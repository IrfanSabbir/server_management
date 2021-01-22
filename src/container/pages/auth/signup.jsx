import React , {useState} from 'react'
import {Container, Paper,TextField ,Button, Typography} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

import {connect} from 'react-redux'
import * as action from '../../../store/actions/index'
import Logo from '../../assets/inituxlogo.png'

const useStyles = makeStyles({
    root:{
        paddingTop:"15vh",
        textAlign:"center",
        position:"relative"
    },
    papper:{
        width:"45vw",
        minWidth:"330px",
        width:"70%",
        padding:"40px 10px",
        marginLeft:"15%",
        backgroundColor:"#F2F2FC "

    },
    input: {
        width:"70%",
        fontSize:"20px"
    },
    button:{
        minWidth:"70%",
        textTransform:"none",
        fontSize:"20px",
        backgroundColor:"#007bfc"
    },
  })
const Signup = (props)=>{
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [hasErrors, setHasErrors] = useState(false)
    const [errors, setErrors] = useState([])

    const classes = useStyles();

    const signupHandler = (event)=>{
        event.preventDefault()
        setHasErrors(false)
        setErrors([])
        let headers= {
            "Content-Type": "application/json"
        }
        if(!email){
            setHasErrors(true)
            const err =errors
            err.push("email is required")
            setErrors(err)
        }
        if(!password){
            setHasErrors(true)
            const err = errors
            err.push("password is required")
            setErrors(err)
        }
        if(password !== confirmPassword || !confirmPassword ){
            setHasErrors(true)
            const err = errors
            err.push("password and confirm password should match")
            setErrors(err)
        }
        // if(!hasErrors){
            const inputData={
                email,password,confirmPassword
            }
            console.log(inputData)
            axios.post(process.env.REACT_APP_BASE_URL + 'customer_api/auth/' , inputData,
            {headers:headers})
            .then(result=>{
                console.log(result)
                const expiresIn = new Date(new Date().getTime()+ 24*3600*1000);
                props.onAuth(result.data.token ,  expiresIn)
                // props.onAuth(result.data.token, expiresIn , result.data.user)
            })
            .catch(error=>{
                console.log(error)
            })
            
        // }

      }
         console.log(errors)
      let errorBody = "";
    //   if(hasErrors){
    //       errorBody = errors.map((error, index)=>
    //       <div key={index}>
    //           <p style={{color:"red", textAlign:"left", paddingLeft:"20px"}}>{error}</p>
    //       </div>
    //       )}
    {/* <div style={{backgroundColor:"#8BC6EC",backgroundImage:" linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)" , height:"100vh",margin:"0" }}> */}
    return(
        <div>
            <div className="TopSqure"></div>
            <div className="triangleDown"></div>

         
    <Container fixed className={classes.root}>
         <NavLink to="/" style={{backgroundColor:"#f7fdff", padding:"20px"}}>
                <img src={Logo} alt="logo" />
            </NavLink><br/><br/>
         <Paper variant="outlined" className={classes.papper}>
          <h2><strong>Create Account</strong></h2>
             <br/>
               
                <TextField variant="outlined" required type="email" 
                    className={classes.input} 
                    onChange={(event)=>setEmail(event.target.value)}
                        label="email"
                        InputProps={{ style:{ fontSize:25} }}
                        placeholder="enter you mail..."
                /><br/><br/>
                 
                <TextField variant="outlined" required type="password" 
                    className={classes.input} 
                    onChange={(event)=>setPassword(event.target.value)}
                    label="password"
                    InputProps={{ style:{ fontSize:25} }}
                    placeholder="********"
                /><br/><br/>
                 
                <TextField variant="outlined" required type="password" 
                    className={classes.input} 

                    onChange={(event)=>setConfirmPassword(event.target.value)}
                    label="confirm password"
                    InputProps={{ style:{ fontSize:25} }}
                    placeholder="********"
                /><br/><br/>
                
                 <Button variant="contained" color="primary" size="large"  className={classes.button} onClick={signupHandler}>Create Account</Button><br/> <br/>
               <Typography variant="body1" style={{left:"0%", fontWeight:"bold"}}>Already have an account? <NavLink to="/login" >Login</NavLink> </Typography> <br/>
        </Paper>
    </Container>
     </div>
    )
}


const maspDispatchToProps = dispatch =>{
    return{
        onAuth: (token,expiresIn) =>dispatch(action.auth_start(token, expiresIn))
    }
}

export default connect(null, maspDispatchToProps)(Signup)