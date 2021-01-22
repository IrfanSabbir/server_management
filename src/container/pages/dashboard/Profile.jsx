import React , {useState, useEffect} from 'react'

import {Container, Grid, Divider} from '@material-ui/core'
import { connect } from 'react-redux'
import axios from 'axios'
import './style/Profile.css'
import UpdateProfile from '../../../components/profile/UpdateProfle'
import UpdatePassword from '../../../components/profile/UpdatePassword'


const list =[true, false]

const Profile = (props)=>{
    const [showtext, setShowtext] = useState([...list])
    const [customer, setCustomer] = useState({})
    useEffect(()=>{
        const profileInfo = async ()=>{
            try {

                const headers = {
                    'Content-Type':"aplpication/json",
                    "Authorization":"Bearer "+props.token
                }
                const result = await axios.get(process.env.REACT_APP_BASE_URL+"customer_api/auth/", {headers:headers})
                // console.log(result.data.customer)
                setCustomer(result.data.customer)
                
            } catch (error) {
                console.log(error)
            }
        }
        profileInfo()
    },[])

    const changeRead= (val)=>{
        let listBoool = [false, false]
        listBoool[val]= true
        setShowtext(listBoool)
    }

    return(
        <Container> 
            <p className="ProfileTitle">{customer && customer.email}</p><br/><br/>
            <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={1} lg={1} style={{borderBottom: showtext[0] && "2px solid #007bff", width: showtext[0] && "100%" }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(0)}} >Profile</p>
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={2} lg={2}   style={{borderBottom: showtext[1] && "2px solid #007bff", width: showtext[0] && "100%"  }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(1)}} >Authentication</p>
               </Grid>
           </Grid>
               <Divider style={{marginTop:"9px"}}/>
               {customer.email && <div style={{marginTop:"30px", textAlign:"left"}}>
                   {showtext[0]  &&  <UpdateProfile token ={props.token} customer={customer}/>}
                   {showtext[1]  &&   <UpdatePassword token ={props.token}/>}

               </div>   } 
        </Container>
    )
}

const mapStateToProps =state =>{
    return{
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(Profile)