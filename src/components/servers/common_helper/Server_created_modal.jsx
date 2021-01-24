import React  from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ServerCreatedModal = (props)=>{
    const {
        className
      } = props;
    
    return(
        <div style={{width:"100%"}}>
        <br/>
    
    <Modal isOpen={props.modal} toggle={props.modalHandler} className={className} style={{top:"80px", left:"100px"}}>
        <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Server Response</ModalHeader>
        <ModalBody >

           <div style={{textAlign:"center"}}>
                 <div  style={{textAlign:"center", margin:"15px"}}>
                    {props.message}
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

export default ServerCreatedModal