import React from 'react'
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { NavLink} from 'react-router-dom'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DnsIcon from '@material-ui/icons/Dns';
import ComputerIcon from '@material-ui/icons/Computer';
import PaymentIcon from '@material-ui/icons/Payment';
import FilterDramaIcon from '@material-ui/icons/FilterDrama';

import './Navigation.css'
import {connect} from 'react-redux'




const Navigation = (props)=>{
    return(
        <div className="Navigation">
            <br/>
        {!props.token  && <div>
          <NavLink to="/login"  >
                <ListItem >
                    <VpnKeyIcon /> &nbsp; &nbsp; &nbsp; Login
                </ListItem>
            </NavLink>

            <NavLink to="/signup">
                <ListItem >
                     <PersonAddIcon /> &nbsp; &nbsp; &nbsp; Rigester
                    {/* <ListItemText primary="regester" /> */}
                </ListItem>
            </NavLink>
        </div>}
        {props.token  && <div>
          <NavLink to="/dashboard"  exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                    <DashboardIcon /><span style={{paddingLeft:"30px"}}>Dashboard</span>
                </ListItem>
            </NavLink>
            {/* <NavLink to="/dashboard/create_vpn_server" exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <CloudUploadIcon /> <span style={{paddingLeft:"31px"}}>Create vpn server</span>
                </ListItem>
            </NavLink>
            <NavLink to="/dashboard/create_cloud_server" exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <FilterDramaIcon /> <span style={{paddingLeft:"31px"}}>Create cloud server</span>
                </ListItem>
            </NavLink> */}
            <NavLink to="/dashboard/vpn_servers"  exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <DnsIcon /><span style={{paddingLeft:"31px"}}> Vpn Server</span>
                </ListItem>
            </NavLink>
            <NavLink to="/dashboard/cloud_servers"  exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <CloudUploadIcon /><span style={{paddingLeft:"31px"}}> Cloud Server</span>
                </ListItem>
            </NavLink>
            {/* <NavLink to="/dashboard/packages"  exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <LocalAtmIcon /> <span style={{paddingLeft:"30px"}}> Packages</span>
                   
                </ListItem>
            </NavLink> */}
            <NavLink to="/dashboard/payments"  exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <PaymentIcon /> <span style={{paddingLeft:"30px"}}> Payments</span>
                    {/* <ListItemText primary="regester" /> */}
                </ListItem>
            </NavLink>
          
            {/* <NavLink to="/dashboard/snapshots"  exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <ComputerIcon /><span style={{paddingLeft:"31px"}}> Snapshots</span>
                </ListItem>
            </NavLink> */}
          
            {/* <NavLink to="/dashboard/profile" exact style={{textDecoration:"none"}}>
                <ListItem className="listTextSize">
                     <PersonAddIcon /><span style={{paddingLeft:"30px"}}> Profile</span>
                </ListItem>
            </NavLink> */}
        </div>}

        </div>
    )
}
const mapStateToProps = state =>{
    return{
        token:state.auth.token
    }
}
export default connect(mapStateToProps) (Navigation)