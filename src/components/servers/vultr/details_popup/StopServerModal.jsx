import React, {useState}  from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

const StopServerModal = (props)=>{
    const [modal,setModal] = useState(props.modal)
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
            console.log(props.route)
            console.log(props.server_id)

            const inputData ={
                server_id:props.server_id,
                route:props.route
            }
            const result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server/stop",
                                        inputData, {headers:headers} )
            
            
            setSpinner(false)
            props.modalHandler(result.data.message, false,result.data.server)
             
        } catch (error) {
            console.log(error)
            setSpinner(false)
            props.modalHandler("Unable to stop server. Try again!", true,{})
        }
    }

    return(
        <div style={{width:"100%"}}>
        <br/>
    
    <Modal isOpen={modal} toggle={()=>props.modalHandler("", false)} className={className} style={{top:"80px", left:"100px"}}>
        <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Stop Server</ModalHeader>
        <ModalBody >

           <div style={{textAlign:"center"}}>
                 <div  style={{textAlign:"center", margin:"15px"}}>
                    <p style={{color:"red", fontSize:"25px"}}>Are you sure to Stop server?</p>
                   { spinner ? <CircularProgress/>:
                   <Button color="danger" onClick={stopServerHandler}>Stop Server</Button>}<br/><br/>

                    <p>* This is a hard power off (basically, unplugging the machine). The data on the machine will not be modified, and you will still be billed for the machine. *</p>

                 </div>
               
            </div><br/>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={()=>props.modalHandler("", false)}>Cancel</Button>
        </ModalFooter>
    </Modal>
    </div>
    )
}



export default StopServerModal