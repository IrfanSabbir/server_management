import React, {useState , useEffect}  from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Skeleton} from '@material-ui/lab'
import {  format } from 'date-fns'

const RestartServer = (props)=>{
    const [spinner, setSpinner] = useState(false)
    const [balance, setBalance] = useState(0)
    const [newBalance, setNewBalance] = useState(0)
    const [montly, setMonthy] = useState(0)
    const [newExpire, setNewExpireDate]= useState("")
    const [canRenew, setCanReniew] = useState(true)
    const  [skelt, setSkelt] = useState(false)
    const {
        className
      } = props;

    
      useEffect(()=>{
          const profileInfo = async ()=>{
              try {
                setSkelt(true)

                const headers = {
                    'Content-Type':"aplpication/json",
                    "Authorization":"Bearer "+props.token
                }
                const result = await axios.get(process.env.REACT_APP_BASE_URL+`customer_api/auth/balance_package/?package_id=${props.server.package}`, {headers:headers})
                result.data.monthly_price > result.data.balance && setCanReniew(false)
                setMonthy(result.data.monthly_price)
                setBalance(result.data.balance)

                let today = new Date(props.server.expire_date)
                 today.setDate(new Date(today).getDate() + 31)
                 today = format(new Date(today), 'yyyy-MM-dd kk:mm:ss')
                 setNewExpireDate(today)

                 let newBlnc = result.data.balance-result.data.monthly_price
                 newBlnc = newBlnc.toFixed(4)
                 setNewBalance(newBlnc)

                setSkelt(false)
                
            } catch (error) {
                setSkelt(false)
                console.log(error)
            }
        }
        profileInfo()
    },[])

    const renewServerHandler = async ()=>{
        try {
            setSpinner(true)
            const headers={
                "Content-Type":"application/json",
                "Authorization":"Bearer "+props.token
            }

            const inputData ={
                server_id:props.server_id,
                package:props.server.package,
                route:props.route
            }
            const result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server/update_expiredate",
                                        inputData, {headers:headers} )
            
            console.log(result.data)
            setSpinner(false)
            props.modalHandler(result.data.message, false, result.data.server)
             
        } catch (error) {
            console.log(error)
            setSpinner(false)
            props.modalHandler("Unable to restart server. Try again!", true ,{})
        }
    }
    let jsx_body = ""
    if(props.server.billing_type !== "monthly"){
        jsx_body =<p style={{fontSize:"20px"}}> Only monthly server can be Renewable</p> 
    }
    else{
        jsx_body =   skelt ? 
                    <div style={{textAlign:"center"}}>
                        <Skeleton variant="rect" width="80%" height="100px"/>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton variant="text" width="40%" height="100px"animation="pulse"/>
                        <Skeleton variant="text"  width="80%" height="100px"/>

                    </div>:
                   <div style={{textAlign:"center"}}>
                    <div  style={{textAlign:"center", margin:"15px"}}>
                        
                        <p style={{fontSize:"18px"}}> Current Expire Date :<span style={{color:"blue", fontSize:"20px"}}> {props.server.expire_date} </span><br/>
                         Current Balance is :<span style={{color:"#fcba03", fontSize:"20px"}}> {balance} $</span></p>
                        
                         <p style={{fontSize:"18px", color:"#007bfc"}}>
                             After Renew new server,  expire date will be  <br/> 
                             <span style={{color:"blue", fontWeight:"bolder",fontSize:"22px"}}>{newExpire}</span>  <br/>
                             Your new balance will : 
                             <span style={{color:"#fcba03", fontSize:"20px"}}> {newBalance} $</span>
                         </p>
                        { spinner &&  <CircularProgress/>}
                        {!canRenew && <Button color="primary" disabled>Not enough balance to renew server</Button>}
                        {canRenew && !spinner && <Button color="primary" onClick={renewServerHandler}>Renew Server</Button>}<br/><br/>

                    </div>
               </div>
    }

    return(
        <div style={{width:"100%"}}>
        <br/>
    
    <Modal isOpen={props.modal} toggle={()=>props.modalHandler("", false)} className={className} style={{top:"80px", left:"100px"}}>
        <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Renew Server</ModalHeader>
        <ModalBody >

         {jsx_body}<br/>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={()=>props.modalHandler("", false)}>Cancel</Button>
        </ModalFooter>
    </Modal>
    </div>
    )
}

export default RestartServer