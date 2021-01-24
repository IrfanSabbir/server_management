import React  , {useState, useEffect} from 'react'

import axios from 'axios'
import {connect} from 'react-redux'
import {Container, Grid, Paper, Button, Typography} from '@material-ui/core'
import VultServer from '../../../../components/servers/vultr/cloud_server_create/Cloud_server_create'
import vultLogo from '../../../assets/vultrlogo.png'
const CloudServer = (props)=>{

    const [route, setRoute] = useState("")
    const [packages, setPackages ] = useState([])
    const [vultr_os, setVultrOs ] = useState([])
    const [locations, setLocations ] = useState([])

    useEffect(()=>{
        const getPreeData= async () =>{
            try {
                const headers = {
                    'Content-Type':"application/json",
                    "Authorization":"Bearer "+props.token
                }
                const result = await axios.get(process.env.REACT_APP_BASE_URL+"customer_api/server/server_data_cloud", {headers:headers})
                 console.log(result.data)
                setLocations(result.data.vultr_locations)
                setPackages(result.data.packages)
                setVultrOs(result.data.vultr_os)
            } catch (error) {
                console.log(error)
            }
        }
        getPreeData()
        return () => {
            setLocations([])
            setPackages([])
            setVultrOs([]) 
          };
    },[])

    const routeHandler = (route)=>{
        setRoute(route)
    }
    const returnHandler = ()=>{
        setRoute("")
    }

    return(
        <Container>
           {!route &&  <div>
                <p className="Title_text"> Select Server Provider & Continue creating Cloud server</p>
                <Grid container spacing ={3}>
                    <Grid item xs={12} sm={6} md={4} lg={4} >
                        <Paper variant="outlined">
                            <div style={{height:"100px"}}>
                                <img src= {vultLogo} alt="vultrLogo" style={{width:"90%"}}/>
                            </div>
                            <Button variant="contained" color="primary" 
                            onClick={()=>routeHandler("vultr")}
                            style={{ width:"100%", textTransform:"none", fontSize:"20px"}}>Continue</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>}
            {route  === "vultr" && 
             <VultServer
             packages={packages}
             locations={locations}
             os={vultr_os}
             route ={route}
             returnHandler={returnHandler}
              />}
        </Container>
    )
}

const mapStateToProps = state=>{
    return{
        token:state.auth.token
    }
}
export default connect(mapStateToProps)(CloudServer)