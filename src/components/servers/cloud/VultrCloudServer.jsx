import React , {useState}from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Container, Button, Divider, Grid, Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


import '../Server_Comp.css'
import Location_Component from '../Select_Location'
import SnapShot_Component from '../Snapshot'
import Pakcage_Component from '../Server_Packages'
import Serverinputs_Component from '../Server_Inputs'
import ServerCreatedModal from '../Server_createdModal'

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
  

const CreateCloudServer = (props)=>{
    const classes = useStyles();
    const [OSID, setOSID] = useState()
    const [DCID, setDCID] = useState("")
    const [route, setRoute]= useState(props.route)
    const [package_id, setPackageId] = useState("")
    const [billing_type, setBillingType] = useState("")
    const [label, setLabel] = useState("")
    const [hostname, setHostname] = useState("")
    const [modal, setModal] = useState(false)
    const [spinner, setSprinner] = useState(false)
    const [message, setMessage]= useState("")

    return(
        <Container>
            <p  onClick={props.returnHandler} className="Title_text"
            style={{cursor:"pointer", borderBottom:"2px #007bff"}}
            >Return</p>
            <Divider style={{backgroundColor:"#D3D3D3"}}/><br/>

            <Location_Component 
            locations={props.locations}
            setDCIDHandler={setDCID}
            DCID = {DCID}
             />
             
            <br/> <br/> <br/> 

            

        </Container>
    )
}

export default CreateCloudServer