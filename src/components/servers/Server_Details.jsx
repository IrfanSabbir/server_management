import React  from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ServerDetails = (props)=>{
    const {
        className
      } = props;
    
    
    return(
        <div style={{width:"100%"}}>
            <br/>
        
        <Modal isOpen={props.modal} toggle={props.modalHandler} className={className} style={{top:"80px", left:"100px"}}>
            <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Server Details</ModalHeader>
            <ModalBody style={{backgroundColor:"#f0f0f0"}}>
  
               <div style={{textAlign:"center"}}>
                     <div  style={{textAlign:"left", margin:"15px", fontSize:"18px"}}>
                       <p>Server IP <b>{props.server.server_ip} </b> is currently  {props.server.status}</p>
                       <p>Server Name : {props.server.server_name}</p>
                       <p>route : {props.server.route}</p>
                       <p>os : {props.server.os}</p>
                       {/* <p>user : {props.server.user}</p>

                       
                       {props.server.os !== "Snapshot" && <p>password : { props.server.password}</p>} */}
                       <p>Location : {props.server.location}</p>
                       <p>Billing Type : {props.server.billing_type}</p>
                       <p style={{color:"red", fontWeight:"bold"}}>Will expire on {props.server.expire_date}</p>

                     </div>
                   
                </div><br/>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={props.modalHandler}>close</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}


export default ServerDetails

