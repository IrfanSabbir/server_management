import React ,  {useEffect}from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';

import Layout from './container/layout/Layout'
import LandingPageLaoyout from './container/layout/landingPageLayout'
import Login from './container/pages/auth/login'
import Signup from './container/pages/auth/signup'
import Landingpge from './container/pages/LadingPage'

import Logout from './container/pages/auth/logout'
import Dashboard from './container/pages/dashboard/Dashboard'
import Packages from './container/pages/dashboard/Packages'
import Snapshots from './container/pages/dashboard/Snapshots'
import VpnServers from './container/pages/dashboard/vpn_server/VpnServers'
import CloudServer from "./container/pages/dashboard/cloud_server/CloudServers";
import CreateVpnServer from './container/pages/dashboard/vpn_server/CreateVpnServer'
import CreateCloudServer from './container/pages/dashboard/cloud_server/CreateCloudServer'
import Profile from './container/pages/dashboard/Profile'
import Payments from './container/pages/dashboard/Payments'
import ServerDetails from './components/servers/Server_Details/Server_Details_Page'




import {connect} from 'react-redux'
import * as action from './store/actions/index'
import { Payment } from '@material-ui/icons';

const  App=(props)=> {

  useEffect(()=>{
    props.onAuthCheck()
  },[])

  let route =
  <Switch>
      
         <Route path="/login" component={Login}/>
         <Route path="/signup" component={Signup}/>
        <LandingPageLaoyout>
            <Route path="/" component ={Landingpge}/>
            <Redirect to="/"/>
        </LandingPageLaoyout>
    </Switch>
  if(props.token){
    route = <Layout>
         <Route path="/logout" component={Logout}/>
         <Route path="/dashboard/packages" exact component={Packages}/>
         <Route path="/dashboard/payments" exact component={Payments}/>
         <Route path="/dashboard/snapshots" exact component={Snapshots}/>
         <Route path="/dashboard/vpn_servers" exact component={VpnServers}/>
         <Route path="/dashboard/cloud_servers" exact component={CloudServer}/>
         <Route path="/dashboard/profile" exact component={Profile}/>
         <Route path={`/dashboard/server_details/:server_id`} exact component={ServerDetails}/>
         <Route path="/dashboard/create_vpn_server" exact component={CreateVpnServer}/>
         <Route path="/dashboard/create_cloud_server" exact component={CreateCloudServer}/>
         <Route path="/dashboard" exact component={Dashboard}/>
         <Redirect to="/dashboard"/>
    </Layout>
  }
  return (
    <div className="App">
      {/* <Layout> */}
         {route}
      {/* </Layout> */}
    </div>
  );
}

const mapStateToProps = state=>{
  return {
    token :state.auth.token
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onAuthCheck : ()=>dispatch(action.auth_check())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
