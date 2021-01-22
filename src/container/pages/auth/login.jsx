import React , {useState} from 'react'
import {Container, Grid,Paper,TextField ,Button, Typography} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import * as action from '../../../store/actions/index'
import axios from 'axios'
import Logo from '../../assets/inituxlogo.png'
const useStyles = makeStyles({
    root:{
        paddingTop:"15vh",
        textAlign:"center",
        position:"relative"
    },
    papper:{
        width:"70%",
        minWidth:"70%",
        padding:"20px 10px",
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
        
    }
  })
const Login = (props)=>{
    const [email, setEmail]= useState('')
    const [password, setpassword]= useState('')
    // const [islogin , setIsLogIn] = useState(true)
    const classes = useStyles();

    const loginHandler = (event)=>{
        event.preventDefault()
       
        let headers= {
            "Content-Type": "application/json"
        }
        const inputData={
            email,password
        }
        console.log(inputData)
        axios.post(process.env.REACT_APP_BASE_URL + 'customer_api/auth/login' , inputData,
        {headers:headers})
        .then(result=>{
            console.log(result)
            const expiresIn = new Date(new Date().getTime()+ 24*3600*1000);
            props.onAuth(result.data.token ,  expiresIn)
        })
        .catch(error=>{
            console.log(error)
        })
      }
      
    return(<div>
           <div className="TopSqure"></div>
            <div className="triangleDown"></div>

         
        <Container fixed className={classes.root}>
            <NavLink to="/" style={{backgroundColor:"#f7fdff", padding:"20px"}}>
                <img src={Logo} alt="logo" />
            </NavLink><br/><br/>
         <Paper variant="outlined" className={classes.papper}>
          <h2><strong>Login to your Account</strong></h2><br/><br/>
                <TextField variant="outlined" required type="email" 
                    className={classes.input} 
                    onChange={(event)=>setEmail(event.target.value)}
                        label="Email"
                        InputProps={{ style:{ fontSize:25} }}
                        placeholder="enter you mail..."
                /><br/><br/>
                <TextField variant="outlined" required type="password" 
                    className={classes.input} 
                    onChange={(event)=>setpassword(event.target.value)}
                    label="password"
                    InputProps={{ style:{ fontSize:20} }}
                    placeholder="********"
                /><br/><br/>
                 <Button variant="contained" color="primary" size="large"  className={classes.button} onClick={loginHandler}>Login</Button><br/> <br/>
               <Typography variant="body1" style={{left:"0%", fontWeight:"bold"}}>Not Registered Yet? <NavLink to="/signup" >Register</NavLink> </Typography> <br/>
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

export default connect(null, maspDispatchToProps)(Login)