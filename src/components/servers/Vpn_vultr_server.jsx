import React , {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {Container, Button, Divider, Grid, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Server_Comp.css'
import Location_Component from './Select_Location'
import SnapShot_Component from './Snapshot'
import Pakcage_Component from './Server_Packages'
import Serverinputs_Component from './Server_Inputs'
import ServerCreatedModal from './Server_createdModal'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  button:{
    minWidth:"100px",
    textTransform:"none",
    fontSize:"20px",
    backgroundColor:"#007bfc",
    padding:"5px 50px",
    color:"white",
}
}));



const Vultr_Server = (props)=>{
    const classes = useStyles();
    const history = useHistory();

    const [OSID, setOSID] = useState(164)
    const [DCID, setDCID] = useState("")
    const [server_type, setServerType] = useState("vpn")
    const [vpn_type, setVpnType]= useState("")
    const [country,setCountry] = useState("")
    const [SNAPSHOTID , setSNAPSHOTID] = useState("")
    const [route, setRoute]= useState(props.route)
    const [package_id, setPackageId] = useState("")
    const [billing_type, setBillingType] = useState("monthly")

    const [fields, setFields] = useState([{ label: "", hostname: "" }])
    const [hostname, setHostname] = useState([{ hostname: "" }])

    // const [hostname, setHostname] = useState(label)

    const [modal, setModal] = useState(false)
    const [spinner, setSprinner] = useState(false)
    const [message, setMessage]= useState("")


    const  labelHandleChange=(i, event) =>{
        const values = [...fields];
        values[i].label = event.target.value;
        values[i].hostname = event.target.value;

        setFields(values);
      }

      const  hostnameHandleChange=(i, event) =>{
        const host = [...fields]
        host[i].hostname = event.target.value;
        setFields(host)

      }

      const handleAdd=()=> {
        const values = [...fields];
        values.push({ label: "",hostname: "" });
        setFields(values);
      }
      


    const cancleModal = ()=>{
        setModal(false)
        setMessage("")
        history.push("/dashboard/vpn_servers")

    }
    console.log(vpn_type)
    const handleServer = async ()=>{
        try {
            //  = []
            const label =[]
            const hostname = []

            let subIndex =0
             fields.map(field => {

                 if(field.label.length>0){
                    label[subIndex]= field.label
                    hostname[subIndex]= field.hostname
                    subIndex++
                 }

                return  null 
              })
            console.log(label)
            console.log(hostname)

            setSprinner(true)
            const inputData =  {
                OSID, DCID, SNAPSHOTID, label, hostname, route, country, server_type, vpn_type, package_id, billing_type
            }
            const headers = {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+props.token
            }
            
            let result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server", inputData, {headers:headers})
            setSprinner(false)
            setMessage( <p style={{color:"green", fontSize:"20px",fontWeight:"bolder"}}>{result.data.message}</p>)
          
            setDCID("")
            setSNAPSHOTID("")
            setPackageId("")
            setBillingType("")
            setFields([{ label: "", hostname: "" }])
            // setLabel("")
            // setHostname("")
            setModal(true)
            


        } catch (error) {
           console.log(error)
            setSprinner(false)
            setModal(true)
            setMessage( <p style={{color:"red", fontSize:"25px", fontWeight:"bolder"}}> We are unable to create server. <br/>Please try again!</p>)
         
        }
    }
    return(
        <Container>
            <p  onClick={props.returnHandler} className="Title_text"
            style={{cursor:"pointer", borderBottom:"2px #007bff"}}
            >Return</p>
            <Divider style={{backgroundColor:"#D3D3D3"}}/><br/>
            
            <Location_Component 
            locations={props.locations}
            setDCIDHandler={setDCID}
            setCountry = {setCountry}
            DCID = {DCID}
             />
             
            <br/> <br/> <br/> 
            <hr style={{backgroundColor:"#007bff"}}/>
            <br/>  

            <SnapShot_Component
               SNAPSHOTID={SNAPSHOTID}
               setSNAPSHOTID ={setSNAPSHOTID}
               snpashots ={props.snapshots}
               setVpnType ={setVpnType}
            />

            <br/>  
            <hr style={{backgroundColor:"#007bff"}}/>
            <br/>  

            <Pakcage_Component
               packages ={props.packages}
               route={route}
               setPackageId = {setPackageId}
               package_id = {package_id}
               setBillingType={setBillingType}
               billing_type={billing_type}
            />
            <br/>  
            <hr style={{backgroundColor:"#007bff"}}/>
            <br/>  

            <Serverinputs_Component 
            setLabel={labelHandleChange} 
            setHostname={hostnameHandleChange} 
            fields={fields}
            handleAdd={handleAdd}
            />

           
            {spinner ? <CircularProgress size={80}/>:
           <Button variant="contained" color="primary" onClick={handleServer} className={classes.button}>
                Create Server
                </Button>}<br/><br/><br/>


          {modal && <ServerCreatedModal
                   modal={modal}
                   modalHandler = {cancleModal}
                   message={message}
                   />}
        </Container>
    )
}

const mapStateToProps = state=>{
    return{
        token:state.auth.token
    }
}
export default connect(mapStateToProps)(Vultr_Server)