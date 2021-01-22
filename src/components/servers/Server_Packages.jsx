import React , {useState, useEffect} from 'react'

import {Container, Grid, Paper, Typography, Divider} from '@material-ui/core'


const Server_Packages = (props)=>{
  
    let packageBody = "Loading"
    if(props.packages){
        packageBody = props.packages.map((pack, index)=>{
              if(pack.route !== "vultr") return
                return(<Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                    <div className={(props.package_id===pack._id ? "Selection Locations_div" :"Locations_div")} 
                         onClick={()=>props.setPackageId(pack._id)}>
                        <div className="Package_title">
                         <Typography variant="h6" > <b style ={{color:"white"}}>{pack.package_name} </b> <span style={{color:'#b3b6d3', fontWeight:"bolder"}}> by {pack.route}</span></Typography>
                         </div><br/>
                        <p className="Package_list_pricing_monthly" > ${pack.monthly_price}/mo   </p>
                        <p className="Package_list_pricing_other" > ${pack.daily_price}/d  <br/> ${pack.hourly_price}/h   </p>
                        <div className="Divider"/>
                        <div>
                            <Typography className="Package_list" >  <b >{pack.disk} disk</b></Typography>
                            <Typography className="Package_list" >  <b >{pack.ram} ram</b></Typography>
                            <Typography className="Package_list" >  <b >{pack.cpu} cpu</b></Typography>
                            <Typography className="Package_list" >  <b >{pack.bandwidth} bandwidth</b></Typography>
                        </div>
                        <br/>
                        

                         
                    </div>
                </Grid>)
            })
            
    }
    return(
        <Container style={{marginTop:"20px"}}>
               <p className="Title_text_black">Packages</p> <br/>
            <Grid container  spacing={2}>
              {packageBody}

            </Grid>
            <br/><br/>
            <Paper  style={{padding:"20px", backgroundColor:"#f5f5f5"}}>
            <p className="Title_text_black">Select Billing Method</p> <br/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4} lg={4}  >
                    <div  className={(props.billing_type === "monthly" ? "Selection Locations_div" :"Locations_div") }
                    onClick={()=>props.setBillingType("monthly")}>
                        <span className="Title_text_black">Monthly Billing</span>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3}  >
                    <div   className={(props.billing_type === "daily" ? "Selection Locations_div" :"Locations_div") }
                    onClick={()=>props.setBillingType("daily")}>
                        <span className="Title_text_black">Daily Billing</span>
                    </div>
                </Grid>
             </Grid>  
             </Paper> 
            <br/>
            <br/>
        </Container>
    )
}


export default Server_Packages