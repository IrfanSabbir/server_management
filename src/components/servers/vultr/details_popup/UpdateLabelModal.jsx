import React, {useState}  from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField } from '@material-ui/core'

const LabelUpdate = (props)=>{
    const [spinner, setSpinner] = useState(false)
    const [label, setLabel] = useState(props.label)
    const {
        className
      } = props;
    const updateLabelServerHandler = async ()=>{
        try {
            setSpinner(true)
            const headers={
                "Content-Type":"application/json",
                "Authorization":"Bearer "+props.token
            }
            

            const inputData ={
                server_id:props.server_id,
                route:props.route,
                label
            }
            const result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server/update_label",
                                        inputData, {headers:headers} )
            
            console.log(result.data)
            setSpinner(false)
            props.modalHandler(result.data.message, false, result.data.server)
             
        } catch (error) {
            console.log(error)
            setSpinner(false)
            props.modalHandler("Unable to update server label. Try again!", true ,{})
        }
    }

    return(
        <div style={{width:"100%"}}>
        <br/>
    
    <Modal isOpen={props.modal} toggle={()=>props.modalHandler("", false)} className={className} style={{top:"80px", left:"100px"}}>
        <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Update label</ModalHeader>
        <ModalBody >

           <div style={{textAlign:"center"}}>
                 <div  style={{textAlign:"center", margin:"15px"}}>
                   
                   <TextField
                       label="label"
                       type="text"
                       variant="outlined"
                       onChange={(e)=>setLabel(e.target.value)}
                       defaultValue={label}
                   /><br/><br/>
                   { spinner ? <CircularProgress/>:

                   <Button color="primary" onClick={updateLabelServerHandler}>Update label</Button>}<br/><br/>

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

export default LabelUpdate