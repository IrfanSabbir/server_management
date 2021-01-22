import React , { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import axios from 'axios'
import * as actions from '../../store/actions/index'

const Destroy = (props)=>{
    const [message, setMessage] = useState("")
    const [error, setError] = useState(false)

    const {
        className
      } = props;
    
      const serverHandler = async()=>{
          try {
            const headers ={
                "Content-Type": "application/json",
                "Authorization":"Bearer "+props.token
              }
              const inputData = {
                server_id:props.server.server_id,
                route:props.server.route
              }

              console.log(inputData)

              const result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server/destroy", inputData, {headers:headers} )
              // console.log(result)
              props.onDeleteServer(props.serverIndex)
              if(result.data.error === false){
                setError(false)
                setMessage(result.data.message)
             }
             else{
                setMessage(result.data.status)
                setError(true)
              }
          } 
          catch (error) {
            setMessage("Process was uncussessful, please try again")
            setError(true)
              console.log(error)
          }
        
      }
    
    return(
        <div style={{width:"100%"}}>
            <br/><br/>
        
        <Modal isOpen={props.modal} toggle={props.modalHandler} className={className} style={{top:"80px"}}>
            <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Please confirm</ModalHeader>
            <ModalBody style={{backgroundColor:"#f0f0f0"}}>
                <br/>
                    { error && message && <div style={{width:"100%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"red"}}>{message}</div>}
                    {  !error && message &&  <div style={{width:"100%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"#007bfc"}}>{message}</div>}
                <br/>
               {!message && <div style={{textAlign:"center"}}>
                     <div  style={{textAlign:"left", margin:"15px", fontSize:"18px"}}>
                       <p>Server IP <b>{props.server.server_ip} </b> is currently  {props.server.status}</p>
                       <p>Location : {props.server.location}</p>
                       <p>{props.server.billing_type} billing & will expire on {props.server.expire_date}</p>
  


                     </div>
                    <p style={{color:"red" , fontSize:"20px" , fontWeight:"bold"}}>Are you sure to destroy the server?</p>
                    <Button color="danger" onClick={serverHandler}>Destroy server</Button>&nbsp;&nbsp;&nbsp;
                </div>}<br/>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={props.modalHandler}>Cancle</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}

const mapStateToProps = state =>{
    return {
        token :state.auth.token
    }
}

const mapDispatchToProps = dispatch =>{
  return{
     onDeleteServer:(index)=>dispatch(actions.delete_server(index))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Destroy)

