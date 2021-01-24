import React, {useEffect, useState} from 'react'
import {  useParams, useHistory} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import {Container, Grid, Button, Divider, IconButton} from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DeleteIcon from '@material-ui/icons/Delete';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import EditIcon from '@material-ui/icons/Edit';

import StopServerModal from '../details_popup/StopServerModal'
import RestartServerModal from '../details_popup/RestartServerModal'
import DestroyServerModal from '../details_popup/DestroyServerModal'
import ReinstallServerModal from '../details_popup/ReinstallServerModal'
import LableUpdateModal from '../details_popup/UpdateLabelModal'

import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './DetailsPage.css'

import US from '../../../container/assets/flag/US.png'
import CA from '../../../container/assets/flag/CA.png'
import NL from '../../../container/assets/flag/NL.png'
import GB from '../../../container/assets/flag/GB.png'
import DE from '../../../container/assets/flag/DE.png'
import AU from '../../../container/assets/flag/AU.png'
import FR from '../../../container/assets/flag/FR.png'
import JP from '../../../container/assets/flag/JP.png'
import KR from '../../../container/assets/flag/KR.png'
import SG from '../../../container/assets/flag/SG.png'

import DetailsSkeleton from "../Skeleton/DetailsPageSkeleton";


const flag={
    US:US,
    CA:CA,
    NL:NL,
    GB:GB,
    DE:DE,
    AU:AU,
    FR:FR,
    JP:JP,
    KR:KR,
    SG:SG,
}

const list=[true, false, false]
const VultrServerDetails = (props)=>{
    const [server, setServer] = useState({})
    const [showtext, setShowtext] = useState([...list])
    const [stopServerM, setStopServerM]= useState(false)
    const [restartServerM, setRestartServerM]= useState(false)
    const [destroyServerM, setDestroyServerM]= useState(false)
    const [reinstallServerM, setReinstallServerM]= useState(false)
    const [labelUpdateM , setLabelUpdateM] = useState(false)

    const [message, setMessage] = useState("")
    const [error, setErrors] = useState(false)
    const [label, setLabel] = useState("")
    const [spinner, setSpinner] = useState(false)
    const [copy, setCopy]= useState("")

    const params = useParams()
    const history = useHistory()
    useEffect(()=>{
        setSpinner(true)
        getServerDetails()
    }, [])

    const getServerDetails = async ()=>{
        const server_id = params.server_id
        try {
            
            const headers ={
                'Content-Type':"application/json",
                "Authorization":"Bearer "+props.token
            }
            const result = await axios.get(process.env.REACT_APP_BASE_URL+'customer_api/server/details/'+server_id, {headers:headers})
            setServer(result.data.server)
            console.log(result.data.server)
            setSpinner(false)
        } catch (error) {
            console.log(error)
        }
    }
    const closeModalHandler = (message, error, server)=>{
        if(server){
            setServer(server)
        }
       
        setMessage( message)
        setErrors( error)
        setRestartServerM(false)
        setStopServerM(false)
        setDestroyServerM(false)
        setLabelUpdateM(false)
    }

    const destroyServerModal = (message, error,updatServer)=>{
        setMessage( message)
        setErrors( error)
        setDestroyServerM(false)
        if(updatServer){
            setServer({})
        }

    }

    const reinstallServerModalHandler = (message, error, server)=>{
        setMessage( message)
        setErrors( error)
        setReinstallServerM(false)

        if(server && message){
            console.log(server)
            setServer(server)
        }
        // getServerDetails()
    }

   
    const changeRead= (val,route)=>{
        let listBoool = [false, false, false, false, false]
        listBoool[val]= true
        setShowtext(listBoool)
    }

    const closeMessagHandler= ()=>{
        setMessage("")
        setErrors(false)
    }
    
    if(spinner){
        return<DetailsSkeleton/>
    }
    
    let jsx_body=""
    if(showtext[0]){
        jsx_body = <div>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div className="Details_page_box"> 
                      <p  className="Details_Sub_Title">Bandwidth Usage</p>
                      <p> <span className="Details_Title">{server.current_bandwidth_gb} </span>
                           <span  className="Details_Sub_Title"> / {" "+server.allowed_bandwidth_gb}GB</span>
                      </p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div className="Details_page_box">
                      <p  className="Details_Sub_Title">CPU Usage</p>
                      <p> <span className="Details_Title">{server.cpu} </span>
                      </p>
                    </div>
                </Grid> 
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <div className="Details_page_box">
                      <p  className="Details_Sub_Title">Current Charge</p>
                      <p> <span className="Details_Title">$ {server.monthly_price} </span>
                           <span  className="Details_Sub_Title"> / {server.billing_type}</span>
                      </p>
                    </div>
                </Grid>
            </Grid>
             <br/><br/><br/>
             <Grid container spacing={5}>
                 <Grid item xs={12} sm={8} md={4} lg={4}>
                     <div>
                         <p  className="Details_Sub_Title">Location :<span style={{marginRight:"2.5vw"}}/><img src={flag[server.country]} width="40px" height="auto" alt={server.country}/> &nbsp;{server.location}</p>
                         <p  className="Details_Sub_Title">IP address :<span style={{marginRight:"1.3vw"}}/>{server.server_ip}
                         <CopyToClipboard text={server.server_ip}
                            onCopy={setCopy}>
                            <IconButton><FileCopyIcon style={{color:"#FF8989"}}/></IconButton>
                            </CopyToClipboard><br/>{copy ?<span style={{color:"blue"}}> {copy}  (copied)</span>:null }
                         </p>
                         <p  className="Details_Sub_Title">Username :<span style={{marginRight:"1.8vw"}}/>{server.user}</p>
                         <p  className="Details_Sub_Title">Password :<span style={{marginRight:"1.8vw"}}/>{server.password}</p>

                     </div>
                 </Grid>
                 <Grid item xs={12} sm={8} md={4} lg={4}>
                     <div>
                         <p  className="Details_Sub_Title">CPU :<span style={{marginRight:"4.3vw"}}/>{server.cpu}</p>
                         <p  className="Details_Sub_Title">RAM :<span style={{marginRight:"4.3vw"}}/>{server.ram}</p>
                         <p  className="Details_Sub_Title">Storage :<span style={{marginRight:"2.6vw"}}/>{server.disk}</p>
                         <p  className="Details_Sub_Title">Bandwidth :<span style={{marginRight:"1vw"}}/>{server.current_bandwidth_gb +" of " +server.allowed_bandwidth_gb}</p>

                     </div>
                 </Grid>
                 <Grid item xs={12} sm={8} md={4} lg={4}>
                     <div>
                         <p  className="Details_Sub_Title">Label :<span style={{marginRight:"1vw"}}/>{server.server_name}</p>
                         <p  className="Details_Sub_Title">OS  :<span style={{marginRight:"2.4vw"}}/>{server.os}</p>
                       
                     </div>
                 </Grid>
             </Grid>
        </div>
    }

    return(
        <Container>
                          
            { error && message && 
            <div className="Error_message">
                    <span className="Message">{message}</span>
                    <p className="Close_Message" onClick={closeMessagHandler}>close</p>
                </div>}
            {  !error && message &&  <div className="Success_message">
                <span className="Message">{message}</span>
            
                    <p className="Close_Message" onClick={closeMessagHandler}>close</p>
            
                </div>}<br/>
                
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                     
                            <p className="Details_Title">{server.label}
                            <IconButton variant="contained" color="primary" onClick={()=>{ setLabelUpdateM(true)}}><EditIcon/></IconButton>&nbsp;&nbsp;<br/>
                            </p>  
                            <p  className="Details_Sub_Title">{server.server_ip}
                            <CopyToClipboard text={server.server_ip}
                            onCopy={setCopy}>
                            <IconButton><FileCopyIcon style={{color:"#FF8989"}}/></IconButton>
                            </CopyToClipboard>
                            &nbsp;{server.location}&nbsp;&nbsp;&nbsp;{server.expire_date}</p>
                            
                      

                </Grid>
                <Grid item  xs={12} sm={4} md={4} lg={4}><br/>
                    <IconButton onClick={()=>setStopServerM(true)}><PowerSettingsNewIcon className="Details_Icon_Button" style={{fontSize:"30px"}}/></IconButton>
                    <IconButton onClick={()=>setRestartServerM(true)}> <AutorenewIcon className="Details_Icon_Button" style={{fontSize:"30px"}}/></IconButton>
                    <IconButton onClick={()=>setReinstallServerM(true)}><SlowMotionVideoIcon className="Details_Icon_Button" style={{fontSize:"30px"}}/></IconButton>
                    <IconButton onClick={()=>setDestroyServerM(true)}><DeleteIcon className="Details_Icon_Button" style={{fontSize:"30px"}}/></IconButton>

                </Grid>
            </Grid><br/><br/><br/>
            <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={1} lg={2} style={{borderBottom: showtext[0] && "2px solid #007bff", width: showtext[0] && "100%" }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(0, "")}} >Overview</p>
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={2} lg={1}   style={{borderBottom: showtext[1] && "2px solid #007bff", width: showtext[1] && "100%"  }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(1, " backup")}} >Backups</p>
               </Grid>
           </Grid>
           <Divider style={{marginTop:"8px"}}/>
           <div style={{textAlign:"right"}}>
               <IconButton onClick={()=>history.push("/dashboard/create_vpn_server")} style={{marginTop:"-2.6vw"}}>
                   <AddCircleIcon style={{color:"#007bfc", width:"60px",height:"60px"}}/>
               </IconButton>
           </div>
           {jsx_body}

           {stopServerM &&
            <StopServerModal
               modal = {stopServerM}
               modalHandler = {closeModalHandler}
               server_id = {server.server_id}
               route = {server.route}
               token ={props.token}
            />}


            { restartServerM && <RestartServerModal
                    modal = {restartServerM}
                    modalHandler = {closeModalHandler}
                    server_id = {server.server_id}
                    route = {server.route}
                    token ={props.token}
            />}

              { labelUpdateM && <LableUpdateModal
                    modal = {labelUpdateM}
                    modalHandler = {closeModalHandler}
                    server_id = {server.server_id}
                    route = {server.route}
                    token ={props.token}
                    label ={server.server_name}
            />}

                { destroyServerM && <DestroyServerModal
                    modal = {destroyServerM}
                    modalHandler = {destroyServerModal}
                    server_id = {server.server_id}
                    route = {server.route}
                    token ={props.token}
            />} 
            { reinstallServerM && <ReinstallServerModal
                    modal = {reinstallServerM}
                    modalHandler = {reinstallServerModalHandler}
                    server_id = {server.server_id}
                    route = {server.route}
                    token ={props.token}
            />}     
        </Container>
    )
}

const mapStateToProps = state=>{
    return{
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(VultrServerDetails)

