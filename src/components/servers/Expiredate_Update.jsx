import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Container, Grid, Paper, Typography, Divider} from '@material-ui/core'
import * as actions from '../../store/actions/index'
import {  format } from 'date-fns'

const Update_Expire = (props)=>{
    const [packages, setPackages] = useState([])
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)
    const [package_id, setPackageId] = useState("")
    const [billing_type, setBillingType] = useState("")
    const [route, setRooute] = useState(props.server.route)
    const [expireDate, setExpireDate]= useState(props.server.expire_date)
    // console.log(props.indexIndex)

    const {
        className
      } = props;
    const expireDateHandler = async()=>{
        try {
            const inputData = {
                billing_type,
                server_id : props.server._id
            }
            const headers ={
                "Content-Type":"application/json",
                "Authorization":"Bearer "+props.token
            }

            const result = await axios.post(process.env.REACT_APP_BASE_URL +"customer_api/server/update_expiredate",
            inputData , {headers:headers})
            console.log(result.data.server)
            props.onUpdateServer(props.serverIndex,result.data.server)
            if(result.data.error === false){
                setError(false)
                setMessage(result.data.message)
             }
             else{
                setMessage(result.data.status)
                setError(true)
              }
        } catch (error) {
            
            setMessage("Process was uncussessful, please try again")
            setError(true)
            console.log(error)
        }
    }

    const billingMethodHandler = (method, day)=>{
        let today = new Date(props.server.expire_date)
        today.setDate(new Date(today).getDate() + day)
        today=  format(new Date(today), 'yyyy-MM-dd kk:mm:ss')
        setExpireDate(today)

        setBillingType(method)

    }
 
    return(
        <div>
              <Modal isOpen={props.modal} toggle={props.modalHandler}  className={className} style={{top:"80px"}}>
            <ModalHeader  style={{fontSize:"20px", color:"#007bfc"}}>Update Expire Date</ModalHeader>
            <ModalBody >
                <br/>
                    { error && message && <div style={{width:"100%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"red"}}>{message}</div>}
                    {  !error && message &&  <div style={{width:"100%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"#007bfc"}}>{message}</div>}
                <br/>
               {!message && <div style={{textAlign:"center"}}>
                    <p style={{ fontSize:"20px" , fontWeight:"bold", color:"green"}}>Your server will expire on&nbsp;  {"  "+expireDate}</p>
               
                        <Paper  style={{padding:"20px", backgroundColor:"white"}}>
                    <p className="Title_text_black">Select Billing Method</p> <br/>
            
                    <div className={(billing_type === "monthly" ? "Selection Locations_div" :"Locations_div") }
                    onClick={()=>billingMethodHandler("monthly",31)}>
                        <span className="Title_text_black">Monthly Billing</span>
                    </div><br/>
               
                    <div  className={(billing_type === "daily" ? "Selection Locations_div" :"Locations_div") }
                    onClick={()=>billingMethodHandler("daily",2)}>
                        <span className="Title_text_black">Daily Billing</span>
                    </div>
               
                        
             </Paper> 
             <br/><br/>
             <Button color="primary" onClick={expireDateHandler}>Update Expire Date</Button>&nbsp;&nbsp;&nbsp;
                </div>}<br/>
            </ModalBody>
            <ModalFooter>
            <Button color="danger" onClick={props.modalHandler}>close</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        token:state.auth.token
    }
}

const maspDispatchToProps = dispatch =>{
    return{
        onUpdateServer : (index,server)=> dispatch(actions.update_server_data(index,server))
    }
}
export default connect(mapStateToProps,maspDispatchToProps)(Update_Expire)