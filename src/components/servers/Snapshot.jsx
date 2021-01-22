import React, {useState} from 'react'
import {Grid , Divider, Container,Typography} from '@material-ui/core'



const SnapShot_Component = (props)=>{
    
    let snapshots = "Loading"
    if(props.snpashots){
        snapshots = <Grid container spacing={3}>
        { props.snpashots.map((snaps, index)=>{
            if(snaps.snapshot_type !== "vpn") return
         else{ 
         return(
             <Grid item xs={12} sm={6} md={6} lg={4}  key={index}>
                 <div className={(props.SNAPSHOTID.toString()===snaps.snapshot_id.toString() ? "Selection Locations_div" :"Locations_div") }
                  onClick={()=>{props.setSNAPSHOTID(snaps.snapshot_id);props.setVpnType(snaps.vpn_type)}}>
                      <div className="Package_title">
                         <Typography variant="h6" > <b style ={{color:"white"}}>{snaps.snapshot_name} </b> </Typography>
                         </div><br/>
                    
                      <Divider/>
                      <img src={snaps.snapshot_image_url} style={{width:"100%", height:"200px"}} alt="Snapshot image"/>
                   
                 </div>
             </Grid>
         )
        }
         })}
         </Grid>
    }
  

    return(
        <div>
            <p className="Title_text_black">VPN Type</p> <br/>

          
            {/* <Divider style={{marginTop:"8px"}}/> */}
            <br/>
            {snapshots}
            <br/>
            <br/>

        </div>
    )
}

export default SnapShot_Component