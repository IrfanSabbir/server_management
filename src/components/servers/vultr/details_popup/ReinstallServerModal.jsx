import React, {useState}  from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

const ReinstallServer = (props)=>{
    const [spinner, setSpinner] = useState(false)
    const {
        className
      } = props;
    const stopServerHandler = async ()=>{
        try {
            setSpinner(true)
            const headers={
                "Content-Type":"application/json",
                "Authorization":"Bearer "+props.token
            }
          

            const inputData ={
                server_id:props.server_id,
                route:props.route
            }
            const result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server/re_install",
                                        inputData, {headers:headers} )
            
           
            setSpinner(false)
            props.modalHandler(result.data.message, false, result.data.server)
             
        } catch (error) {
            console.log(error)
            setSpinner(false)
            props.modalHandler("Unable to destroy server. Try again!", true)
        }
    }

    return(
        <div style={{width:"100%"}}>
        <br/>
    
    <Modal isOpen={props.modal} toggle={()=>props.modalHandler("", false)} className={className} style={{top:"80px", left:"100px"}}>
        <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Re-install Server</ModalHeader>
        <ModalBody >

           <div style={{textAlign:"center"}}>
                 <div  style={{textAlign:"center", margin:"15px"}}>
                    <p style={{color:"green", fontSize:"25px"}}>Are you sure to re-install server?</p>
                   { spinner ? <CircularProgress/>:
                   <Button color="primary" onClick={stopServerHandler}>Reinstall Server</Button>}<br/><br/>
                   <p> * All data will be permanently lost, but the IP address will remain the same. There is no going back from this call.* </p>

                 </div>
               
            </div><br/>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={()=>props.modalHandler("", false)}>Cancle</Button>
        </ModalFooter>
    </Modal>
    </div>
    )
}

export default ReinstallServer