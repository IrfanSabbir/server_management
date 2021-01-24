import React , {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {Container, Button, Divider, Grid, Paper , TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import Location_Component from '../vpn_server_create/Select_Location'
import Pakcage_Component from '../vpn_server_create/Server_Packages'
import Serverinputs_Component from '../vpn_server_create/Server_Inputs'
import ServerCreatedModal from '../../common_helper/Server_created_modal'

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
      padding:"5px 30px",
      color:"white",
  }
  }));
  
  

const VulterServer = (props)=>{
    const classes = useStyles();
    const history = useHistory();

    const [OSID, setOSID] = useState(164)
    const [DCID, setDCID] = useState("")
    const [server_type, setServerType] = useState("vpn")
    const [vpn_type, setVpnType]= useState("")
    const [country,setCountry] = useState("")
    const [route, setRoute]= useState(props.route)
    const [package_id, setPackageId] = useState(props.packages && props.packages[0] ? props.packages[0]._id : null)
    const [package_slecet, setPackage] = useState(props.packages && props.packages[0])
    const [billing_type, setBillingType] = useState("monthly")

    const [fields, setFields] = useState([{ label: "", hostname: "" }])
    const [hostname, setHostname] = useState([{ hostname: "" }])

    const [totalFields, setTotalFields] = useState(1)
    const [cost, setCost]= useState({price:0 , name:""})
    const [modal, setModal] = useState(false)
    const [spinner, setSprinner] = useState(false)
    const [message, setMessage]= useState("")

    useEffect(()=>{
  
        setCost({
          price: package_slecet.monthly_price,
          name:"monthly"
        })
      },[])
  
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
  
        const handleAdd=(v)=> {
          const values = [...fields];
          if(values.length>v){
            values.pop()
          }
          else if(values.length<v){
            values.push({ label: "",hostname: "" });
          }
          setFields(values);
        }
  
        const handleBillingType = (bill_type)=>{
          setBillingType(bill_type)
          pricingHandler (bill_type, package_slecet, totalFields)
  
        }
        
        const pricingHandler = (bill_type,pack,v)=>{
          let price = cost.price
          if(bill_type=== "monthly"){
            price =v*pack.monthly_price
          }
          else if(bill_type=== "daily"){
            price =v*pack.daily_price
          }
          else{
            price =v*pack.hourly_price
          }
  
          // price = price.toFixed(3)
          let str = price.toString().split(".")[1]
          if(str && str.length>4){
            price = price.toFixed(4)
          }
          setCost({
            price: price,
            name:  bill_type
          })
          handleAdd(v)
  
        }
  
        const handlePackage = (pack)=>{
          setPackage(pack)
          pricingHandler (billing_type, pack, totalFields)
          
        }
  
        const onInputFieldHandler=(v)=>{
          const value =  v > 10 ||  v <1 ? totalFields : v
          setTotalFields(value)
          pricingHandler (billing_type, package_slecet, value)
  
        }
  
        const increaseFields = ()=>{
          const value = totalFields===10 ? 10 :totalFields+1
          setTotalFields(value)
          pricingHandler (billing_type, package_slecet, value)
  
          
        }
  
        const decreaseFields = ()=>{
          const value = totalFields>1 ?totalFields-1 : 1
          setTotalFields( value)
          pricingHandler (billing_type, package_slecet, value)
  
        }
  
      const cancleModal = ()=>{
          setModal(false)
          setMessage("")
          history.push("/dashboard/vpn_servers")
  
      }
      
      const handleServer = async ()=>{
          try {
              //  = []
              const label =[]
              const hostname = []
  
              let subIndex =0
               fields.map(field => {
  
                  //  if(field.label.length>0){
                      label[subIndex]= field.label
                      hostname[subIndex]= field.hostname
                      subIndex++
                  //  }
  
                  return  null 
                })
              console.log(label)
              console.log(hostname)
  
              setSprinner(true)
              const inputData =  {
                  OSID, DCID, label, hostname, route, country, server_type, vpn_type, package_id, billing_type
              }
              console.log(inputData)
              const headers = {
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+props.token
              }
              // let result = {}
              let result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server", inputData, {headers:headers})
              setSprinner(false)
              setMessage( <p style={{color:"green", fontSize:"20px",fontWeight:"bolder"}}> {result.data.message}</p>)
            
              setDCID("")
              setPackageId("")
              setBillingType("")
              setFields([{ label: "", hostname: "" }])
              // setLabel("")
              // setHostname("")
              setModal(true)
              
  
  
          } catch (error) {
              setSprinner(false)
              setModal(true)
              setMessage( <p style={{color:"red", fontSize:"25px", fontWeight:"bolder"}}> We are unable to create server. <br/>Please try again!</p>)
           
          }
      }

    return(
        <Container style={{zIndex:"10", position:"absolute"}}>
            <p  onClick={props.returnHandler} className="Title_text"
            style={{cursor:"pointer", borderBottom:"2px #007bff"}}
            >Return</p>
            <Divider style={{backgroundColor:"#D3D3D3"}}/><br/>
            {/* {console.log(props.locations)} */}
            <Location_Component 
            locations={props.locations}
            setDCIDHandler={setDCID}
            setCountry = {setCountry}
            DCID = {DCID}
             />
             
            <br/> <br/> <br/> 
            <hr style={{backgroundColor:"#007bff"}}/>
            <br/>  

            {/* <SnapShot_Component
               SNAPSHOTID={SNAPSHOTID}
               setSNAPSHOTID ={setSNAPSHOTID}
               snpashots ={props.snapshots}
               setVpnType ={setVpnType}
            /> */}

            <br/>  
            <hr style={{backgroundColor:"#007bff"}}/>
            <br/>  

            <Pakcage_Component
               packages ={props.packages}
               route={route}
               setPackageId = {setPackageId}
               handlePackage ={handlePackage}
               package_id = {package_id}
               setBillingType={handleBillingType}
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
            totalFields={totalFields}
            />
            <br/>  

        <br/>

           <div style={{background:"#F9F8F8",position:"fixed" ,width:"100%", padding:"20px",bottom:"0", zIndex:"100", scrollBehavior:"auto"}}>
              <Grid container>
              <Grid item xs={10} sm={12} md={7} lg={7} style={{padding:"10px", textAlign:"left"}}>
               <AddCircleRoundedIcon 
               onClick={increaseFields}
               fontSize="large" color="primary" style={{cursor:"pointer"}}/>&nbsp;
               <input 
                style={{width:"100px", height:"40px", fontSize:"20px", textAlign:"center"}}
          
                type="number"
                value={totalFields}
                onChange={(e)=>onInputFieldHandler(+e.target.value)}
                />&nbsp;
               <RemoveCircleIcon 
               onClick={decreaseFields}
               fontSize="large" color="secondary" style={{cursor:"pointer"}}/>&nbsp;&nbsp;
                {package_slecet && <span style={{fontSize:"20px",color:"grey", fontWeight:"bolder"}}>({cost.price }$ / {cost.name} </span>})<br/>
              </Grid> 
              
              <Grid item xs={7} sm={7} md={4} lg={4} >
                 {spinner ? <CircularProgress size={80}/>:
                <Button variant="contained" color="primary" onClick={handleServer} className={classes.button}> 
                 Create Server
                </Button>
                }
                </Grid>
           </Grid>
           </div>
             


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
export default connect(mapStateToProps)(VulterServer)