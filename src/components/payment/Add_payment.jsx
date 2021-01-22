import React , { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import axios from 'axios'


const AddPyment = (props)=>{
    const {
        className
      } = props;
    
      const [modal, setModal] = useState(false);
      const [payment_method, setPaymentMethod] = useState("")
      const [transection_id, setTransectionId] = useState("")
      const [payment_date, setPaymentDate] = useState(new Date())
      const [amount, setAmount] = useState(0)
      const [message, setMessage] = useState("")
      const [error, setError] = useState(false)

    
      const toggle = () => setModal(!modal);
      const paymnetHandler = async()=>{
          try {
            const headers ={
                "Content-Type": "application/json",
                "Authorization":"Bearer "+props.token
              }
              const inputData = {
                amount : +amount,
                payment_method,
                transection_id,
                payment_date
              }

              console.log(inputData)

              const result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/payment", inputData, {headers:headers} )
              console.log(result)
              if(result.data.error === false){
                  setError(false)
                  setMessage(result.data.message)
                  setPaymentMethod("")
                  setTransectionId("")
                  setPaymentDate("")
                  setAmount(0)
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
        <Button color="primary" onClick={toggle} style={{fontSize:"20px"}}>Make a payment Request</Button>
        <Modal isOpen={modal} toggle={toggle} className={className} size="lg" style={{top:"80px"}}>
            <ModalHeader  style={{backgroundColor:"#007bfc", fontSize:"20px", color:"white"}}>Payment Request form</ModalHeader>
            <ModalBody style={{backgroundColor:"#f0f0f0"}}>
                <br/>
                { error && message && <div style={{width:"100%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"red"}}>{message}</div>}
                {  !error && message &&  <div style={{width:"100%", color:"white",fontSize:"20px", padding:"20px", backgroundColor:"#007bfc"}}>{message}</div>}
                <br/><br/>
                <div style={{textAlign:"center"}}>
                    <TextField variant="outlined" type="number"required
                    color="primary"
                    style={{width:"50%", fontSize:"20px",}}
                     placeholder="Amount"
                     onChange ={(e)=>setAmount(e.target.value)}
                     label="amount"
                    /><br/><br/>
                     <TextField variant="outlined" type="text"required
                    color="primary"
                    style={{width:"50%", fontSize:"20px"}}
                     placeholder="Payment method Visa/Bcash.."
                     onChange ={(e)=>setPaymentMethod(e.target.value)}
                     label="payment method"
                    /><br/><br/>
                    <TextField variant="outlined" type="datetime-local"required
                    label="Select date and time"
                    color="primary"
                    defaultValue="2021-05-24T10:30"
                    style={{width:"50%", fontSize:"20px"}}
                     placeholder="Payment date"
                     onChange ={(e)=>setPaymentDate(e.target.value)}
                    /><br/><br/>
                     <TextField variant="outlined" multiline type="text"required
                     rows={4}
                    color="primary"
                    style={{width:"50%", fontSize:"20px"}}
                     placeholder="Add payment deatils with Transection Id"
                     onChange ={(e)=>setTransectionId(e.target.value)}
                     label="Transection ID and details"
                    /><br/>
                </div><br/>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={paymnetHandler}>Send Request</Button>&nbsp;&nbsp;&nbsp;
            <Button color="danger" onClick={toggle}>Close</Button>
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

export default connect(mapStateToProps)(AddPyment)

