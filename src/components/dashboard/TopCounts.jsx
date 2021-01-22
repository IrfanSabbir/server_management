import React from 'react'
import { Container, Grid } from '@material-ui/core'
import './Dashboard.css'
const countReport = (props)=>{
    return(
        <Container>
            <Grid container spacing={3}>
            
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#FB5858"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.cloud_limit}</p>
                        <p className="Count_title">Cloud Limit</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#3802A8"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.todayCreatedServer}</p>
                        <p className="Count_title">Created Today</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#3802A8"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.vpnCount}</p>
                        <p className="Count_title">Vpn Server</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#3802A8"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.cloudCount}</p>
                        <p className="Count_title">Cloud server</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#7702A8"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.server_count}</p>
                        <p className="Count_title">Total Server</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#E09B00"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.today_billings}$</p>
                        <p className="Count_title">Today Added</p>
                    </div>
                </Grid> 
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#007bfc"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.balance}$</p>
                        <p className="Count_title">Available balance</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className="Count_Report" style={{backgroundColor:"#02A850"}}>
                        <p style={{color:"white", fontSize:"35px", fontWeight:"bold"}}>{props.counts.total_billing}$</p>
                        <p className="Count_title">Total Billings</p>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

export default countReport