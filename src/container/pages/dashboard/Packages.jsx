import React , {useState, useEffect} from 'react'

import {Container, Grid, Paper, Typography, Divider} from '@material-ui/core'

import {connect} from 'react-redux'
import axios from 'axios'
import './style/Packages.css'

const list =[true, false, false]

const Packages = (props)=>{
    const [packages, setPackages] = useState([])
    const [showtext, setShowtext] = useState([...list])
    const [route, setRoute] = useState("")

    useEffect(()=>{

        const getPackages = async ()=>{
            try {  
                const headers ={
                    "Content-Type": "application/json",
                    "Authorization" :"Bearer "+props.token
                }
                const result = await axios.get(process.env.REACT_APP_BASE_URL+"customer_api/package", {headers:headers} )
                
                setPackages(result.data.packages)
            } catch (error) {
                console.log(error)
            }
          
        }
        getPackages()
    },[])

    const changeRead= (val,route)=>{
        let listBoool = [false, false, false, false, false]
        listBoool[val]= true
        setShowtext(listBoool)
        setRoute(route)
    }

    let packageBody = "Loading"
    if(!route){
        packageBody = packages.map((pack, index)=>{
                return(<Grid item xs={10} sm={8} md={6} lg={4} key={index}>
                    <div className="Packages">
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
    else{
        packageBody = packages.map((pack, index)=>{
            if(pack.route !== route) return
 
                return(<Grid item xs={10} sm={8} md={6} lg={4} key={index}>
                <div className="Packages">
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
            </Grid>)}
        )
    }
    return(
        <Container style={{marginTop:"20px"}}>
            <p  className="Intro_Content">Packages </p><br/>
            <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={1} lg={2} style={{borderBottom: showtext[0] && "2px solid #007bff", width: showtext[0] && "100%" }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(0, "")}} >All packages</p>
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={2} lg={1}   style={{borderBottom: showtext[1] && "2px solid #007bff", width: showtext[1] && "100%"  }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(1, "vultr")}} >vultr</p>
               </Grid>
           </Grid>
           <Divider style={{marginTop:"8px"}}/>
           <br/><br/>
            <Grid container spacing={5}>
              { packageBody}

            </Grid>
        </Container>
    )
}

const mapStateToProps = state =>{
    return {
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(Packages)