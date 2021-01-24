import React from 'react'
import {useHistory} from 'react-router-dom'
import {Container ,Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import ServerTable from "../../../../components/servers/Vpn_server_table/Vpn_server_table"

const useStyles = makeStyles({
    button:{
        minWidth:"100px",
        textTransform:"none",
        fontSize:"20px",
        backgroundColor:"#007bfc",
        padding:"5px 15px",
        color:"white",
    }
  })

const Servers = (props)=>{
    const classes = useStyles();
    const history = useHistory()
    return(
        <Container>
             
           <Button variant="contained" color="primary" onClick={()=>history.push("/dashboard/create_vpn_server")} className={classes.button}>Create Server</Button>
            <br/><br/>
            <ServerTable/>
        </Container>
    )
}

export default Servers