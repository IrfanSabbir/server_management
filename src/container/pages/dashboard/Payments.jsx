import React from 'react'

import {Container, Typography, Divider} from '@material-ui/core'
import Add_Payment from '../../../components/payment/Add_payment'
import PaymentTable from '../../../components/payment/PymnetTable'
const Payments = ()=>{
    return(
        <div>
            <Add_Payment/><br/>
            <br/>
            <p  className="Intro_Content">Payment Table </p>
             <Container fixed style={{marginTop:"30px"}}>
                 <PaymentTable/>
             </Container>
        </div>
    )
}

export default Payments