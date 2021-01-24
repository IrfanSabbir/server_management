import React, {useState} from 'react'
import {Grid , Divider, Container} from '@material-ui/core'

import US from '../../../../container/assets/flag/US.png'
import CA from '../../../../container/assets/flag/CA.png'
import NL from '../../../../container/assets/flag/NL.png'
import GB from '../../../../container/assets/flag/GB.png'
import DE from '../../../../container/assets/flag/DE.png'
import AU from '../../../../container/assets/flag/AU.png'
import FR from '../../../../container/assets/flag/FR.png'
import JP from '../../../../container/assets/flag/JP.png'
import KR from '../../../../container/assets/flag/KR.png'
import SG from '../../../../container/assets/flag/SG.png'



const list =[true, false, false, false, false]

const flag={
    US:US,
    CA:CA,
    NL:NL,
    GB:GB,
    DE:DE,
    AU:AU,
    FR:FR,
    JP:JP,
    KR:KR,
    SG:SG,
}

const Locations = (props)=>{
    const [showtext, setShowtext] = useState([...list])
    const [continent, setContinent] = useState("")


    const changeRead= (val,cont)=>{
        let listBoool = [false, false, false, false, false]
        listBoool[val]= true
        setShowtext(listBoool)
        setContinent(cont)
    }

    let locations = "Loading"
    if(props.locations && !continent){
        locations = <Grid container spacing={3}>
        { props.locations.map((location, index)=>{
         return(
             <Grid item xs={6} sm={4} md={3} lg={3}  key={index}>
                 <div className={(props.DCID.toString()===location.DCID.toString() ? "Selection Locations_div" :"Locations_div") }
                  onClick={()=>{props.setDCIDHandler(location.DCID); props.setCountry(location.country)}}>
                      <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={4} lg={3}>
                          <img src={flag[location.country]} alt={location.country} width="50px" height="auto" style={{marginTop:"10px", marginRight:"10px"}}/>

                          </Grid>
                          <Grid item xs={12} sm={6} md={8} lg={9}>
                          <span className="Title_text_black"> {location.name}</span><br/>
                          <span className="Subtitle_text_black"> {location.country}</span>
                          </Grid>

                      </Grid>
                    
                 </div>
             </Grid>
         )
 
         })}
         </Grid>
    }
    else if(props.locations && continent){
        locations = <Grid container spacing={3}>
        { props.locations.map((location, index)=>{
            if(location.continent !== continent) return
            else{
                return(
                    <Grid item xs={6} sm={4} md={3} lg={3}   key={index}>
                        <div className={(props.DCID.toString()===location.DCID.toString() ? "Selection Locations_div" :"Locations_div") }
                        onClick={()=>props.setDCIDHandler(location.DCID)}>
                           
                           <Grid container>
                            <Grid item xs={12} sm={8} md={4} lg={3}>
                            <img src={flag[location.country]} alt={location.country} width="50px" height="auto" style={{marginTop:"10px"}}/>

                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={9}>
                            <span className="Title_text_black"> {location.name}</span><br/>
                            <span className="Subtitle_text_black"> {location.country}</span>
                          </Grid>

                      </Grid>
                        </div>
                    </Grid>
                )
             }
 
         })}
         </Grid>
    }

    return(
        <Container style={{minWidth:"300px"}} fixed>
            <p className="Title_text_black">Server Locations</p> <br/>
      
            <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={1} lg={2} style={{borderBottom: showtext[0] && "2px solid #007bff"}}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(0, "")}} >All Locations</p>
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={2} lg={2}   style={{borderBottom: showtext[1] && "2px solid #007bff" }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(1, "North America")}} >North America</p>
               </Grid>
               <Grid item sx= {3} sm={2} md={2} lg={2}   style={{borderBottom: showtext[2] && "2px solid #007bff" }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(2, "Europe")}} >Europe</p>
               </Grid>
               <Grid item sx= {3} sm={2} md={2} lg={1}   style={{borderBottom: showtext[3] && "2px solid #007bff"}}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(3,"Asia")}} >Asia</p>
               </Grid>
               <Grid item sx= {3} sm={2} md={2} lg={2}   style={{borderBottom: showtext[4] && "2px solid #007bff" }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(4,"Australia")}} >Australia</p>
               </Grid>
           </Grid>
            <Divider style={{marginTop:"8px"}}/>
            <br/>
            {locations}
        </Container>
    )
}

export default Locations