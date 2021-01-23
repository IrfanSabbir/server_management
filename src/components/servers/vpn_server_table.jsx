import React , {useEffect , useState} from 'react'

import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import axios from 'axios'


import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, Divider, Grid} from '@material-ui/core' 
import RedoIcon from '@material-ui/icons/Redo';
import DeleteModal from './Destroy'
import ExpiredateUpdateModal from './Expiredate_Update'
import ServerDetailsModal from "./Server_Details";
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import DiscFullIcon from '@material-ui/icons/DiscFull';
import DeleteIcon from '@material-ui/icons/Delete'
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import * as actions from '../../store/actions/index'

import StopServerModal from './vultr/details_popup/StopServerModal'
import RestartServerModal from './vultr/details_popup/RestartServerModal'
import ReinstallServerModal from './vultr/details_popup/ReinstallServerModal'
import DestroyServerModal from './vultr/details_popup/DestroyServerModal'
import LableUpdateMOdal from './vultr/details_popup/UpdateLabelModal'
import RenewServerModal from './vultr/details_popup/RenewServerModal'

import VpnFilter from './vultr/vpn_filter'
import ServerRouteFilter from './vultr/server_filter'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import TableSkeleton from './vultr/TableSkeleton'

import US from '../../container/assets/flag/US.png'
import CA from '../../container/assets/flag/CA.png'
import NL from '../../container/assets/flag/NL.png'
import GB from '../../container/assets/flag/GB.png'
import DE from '../../container/assets/flag/DE.png'
import AU from '../../container/assets/flag/AU.png'
import FR from '../../container/assets/flag/FR.png'
import JP from '../../container/assets/flag/JP.png'
import KR from '../../container/assets/flag/KR.png'
import SG from '../../container/assets/flag/SG.png'



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

const columns = [
    {id:"server_data", label:"Server", minWidth:150},
   { id: 'location', label: 'Location', minWidth: 100 },
   { id: 'expire_date', label: 'Expire Date', minWidth: 100 },
   { id: 'billing_type', label: 'Billing Type', minWidth: 100 },
   {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
   },

  {
    id: 'action',
    label: 'Action',
    minWidth: 12,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  
    root: {
        width: '100%',
    },
    container: {
        maxHeight: "auto",
    },
});

const list =[true, false]

const ServerTable = (props)=>{
    const classes = useStyles();
    const [showtext, setShowtext] = useState([...list])
    const [anchorEl, setAnchorEl] = useState(null);
    // const [servers, setServers] = useState(props.servers)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteModal, setDeleteModal] = useState(false)
    const [expireDateModal, setExpireDateModal] = useState(false)
    const [deatilsModal, setDetailsModal] = useState(false)

    const [serverData, setServerData] = useState()
    const [serverIndex, setServerIndex ] = useState()
    
    const [error, setError] = useState(false)
    const [message, setMessage]= useState("")

    const [spinner, setSpinner] = useState(false)
    const [serverId, setServerId] = useState("")
    const [route, setRoute] = useState("vultr")
    const [stopServerM, setStopServerM]= useState(false)
    const [restartServerM, setRestartServerM]= useState(false)
    const [destroyServerM, setDestroyServerM]= useState(false)
    const [reinstallServerM, setReinstallServerM]= useState(false)
    const [labelUpdateM , setLabelUpdateM] = useState(false)
    const [renewServerM , setreNewServerM] = useState(false)

    const [vpn_type, setVpnType] = useState("All");
    const [routeProvider, setRouteProvider] = useState("")
    const [label, setLabel] = useState("")
    const [copy, setCopy]= useState("")
    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        getServers(route)
    },[])

    const changeRead= (val)=>{
        let listBoool = [false, false]
        listBoool[val]= true
        setShowtext(listBoool)
        
    }
    const getServers = async (server_route)=>{
        try {
           setLoader(true)
            setRouteProvider(server_route)
            console.log(server_route)
            const headers ={
                'Content-Type':"application/json",             
                "Authorization":"Bearer "+props.token,
            }
        
            const result = await axios.get(process.env.REACT_APP_BASE_URL+"customer_api/server/vpn_server?route="+server_route, {headers:headers})
            // console.log(result.data.servers)     
            // setServers(result.data.servers)
            setLoader(false)
            props.onAddServers(result.data.servers)
        } catch (error) {
            console.log(error)
        }

    }
    
    const otherServer = ()=>{
        setLoader(true)
    

        props.onAddServers([])

        setTimeout(() => {
        setLoader(false)
            
        }, 1000);

    }
    
    const serverRouteHandler = (server, index)=>{
        setServerData(server)
        setServerId(server.server_id)
        setRoute(server.route)
        setServerIndex(index)
        setLabel(server.server_name)
    }
    const closeModalHandler = (message, error, server)=>{


        console.log(serverIndex)
        if(server){
            props.onUpdateServer(serverIndex, server)
        }
        

        setAnchorEl(null);
        setMessage( message)
        setError( error)
        setRestartServerM(false)
        setStopServerM(false)
        setDestroyServerM(false)
        setLabelUpdateM(false)
        setreNewServerM(false)
        setServerIndex()

    }

    const destroyServerModal = (message, error)=>{
        props.onDeleteServer(serverIndex)
        setAnchorEl(null);
        setMessage( message)
        setError( error)
        setDestroyServerM(false)

    }

    const reinstallServerModalHandler = (message, error, server)=>{
        console.log(server)
        console.log(serverIndex)
        props.onUpdateServer(serverIndex, server)
        setAnchorEl(null);
        setMessage( message)
        setError( error)
        setReinstallServerM(false)

        // getServerDetails()
    }

    const checkServerStatus = async(server_id, route, index)=>{
        try {
            setServerId(server_id)
            setSpinner(true)
            const inputData =  {
                server_id, route
            }
            const headers = {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+props.token
            }
            setMessage("Checking server status.... Please wait!")
            setError(false)

            let  result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server/checkStatus", inputData, {headers:headers})
            const preResult = result.data
            // result = await axios.get(process.env.REACT_APP_BASE_URL+"customer_api/server", {headers:headers})
            
            // setServers(result.data.servers)
            setSpinner(false)
            if(!preResult.error){
                props.onUpdateServer(index,preResult.server)
                setError(false)
                setMessage(preResult.message)
            }
            else{
                setMessage(preResult.status)
                setError(true)
            }
            
        } catch (error) {
            setSpinner(false)
            setMessage("Please try again! "+error.message)
            setError(true)
        }
    }
    const restartServerHandler = async(server_id, route, index)=>{
        try {
            setSpinner(true)
            setServerId(server_id)
            const inputData =  {
                server_id, route
            }
            const headers = {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+props.token
            }
            setMessage("Re-starting.... Please wait!")
            console.log(inputData)
            let  result = await axios.post(process.env.REACT_APP_BASE_URL+"customer_api/server/restart", inputData, {headers:headers})

            props.onUpdateServer(index, result.data.server)
            if(!result.data.error){
                setServerId("")
                setError(false)
                setMessage(result.data.message)
                setSpinner(false)
            }
            else{
                setServerId("")
                setMessage(result.data.status)
                setError(true)
                setSpinner(false)

            }
            // setServers(result.data.servers)
        } catch (error) {
            setServerId("")
            setMessage("Please try again! "+error.message)
            setError(true)
            setSpinner(false)

        }
    }
    const deleteModalHandler = (server, index)=>{
        setServerData(server)
        setDeleteModal(!deleteModal)
        setServerIndex(index)
    }
    const detailsModalHandler = (server)=>{
        setServerData(server)
        setDetailsModal(!deatilsModal)
    }

    const expireDateModalHandler = (server, index)=>{
        // setServerData(server)
        // setServerIndex(index)
        setExpireDateModal(!expireDateModal)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    

    const  createData= (server) =>{
        const server_data =<div>
             <span className="Table_Title">
                <NavLink to={`/dashboard/server_details/${server.server_id}`} style={{textDecoration:"none", color:"grey"}}>
                     {server.server_name}
                 </NavLink> 
                </span><br/>
            {/* <IconButton variant="contained" color="primary" onClick={()=>{serverRouteHandler(server, server.key); setLabelUpdateM(true)}}><EditIcon/></IconButton>&nbsp;&nbsp;<br/> */}
            <span style={{color:"grey"}}>{ server.ram+" "+server.os+" "+server.server_ip} </span>
            <CopyToClipboard text={server.server_ip}
                onCopy={setCopy}>
                <IconButton onClick={()=>setServerId(server.server_id)}><FileCopyIcon style={{color:"#FF8989"}}/></IconButton>
            </CopyToClipboard><br/>{copy&& serverId === server.server_id ?<span style={{color:"blue"}}> {copy}  (copied)</span>:null }
        </div>
        
        const location =<p style={{color:"grey", fontSize:"18px"}}><img src={flag[server.country]} width="40px" height="auto" alt={server.country}/> &nbsp;{server.location }</p>
        const billing_type =<p style={{color:"grey", fontSize:"18px"}}>{server.billing_type }</p>
        
        const expire_date =<div>
              <span style={{color:"grey", fontSize:"17px"}}>{server.expire_date ? server.expire_date: " No expire date" }</span>&nbsp;&nbsp;
              {/* <IconButton variant="contained" color="primary" onClick={()=>expireDateModalHandler(server, server.key)}><EditIcon/></IconButton>&nbsp;&nbsp; */}
            </div> 
       
        const action = <div>
            <IconButton aria-controls="simple-menu" aria-haspopup="true"  onClick={(e)=>{serverRouteHandler(server,server.key);handleClick(e)}}><MoreHorizIcon style={{color:"grey"}}/></IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose ={handleClose}
            >
                
                <MenuItem onClick={handleClose}>
                    <NavLink to={`/dashboard/server_details/${serverId}`} style={{textDecoration:"none", color:"grey"}}>
                        <InfoOutlinedIcon/> &nbsp; Server Details
                    </NavLink> 
                </MenuItem><br/>
                <Divider/><br/>
              {/* <IconButton variant="contained" color="primary" onClick={()=>expireDateModalHandler(server, server.key)}><EditIcon/></IconButton>&nbsp;&nbsp; */}

                <MenuItem onClick={handleClose} style={{color:"grey"}}><span  onClick={()=>setreNewServerM(true)} >< EditIcon /> &nbsp; Renew Server</span></MenuItem>
                <MenuItem onClick={handleClose} style={{color:"grey"}}><span  onClick={()=>setStopServerM(true)} ><PowerSettingsNewIcon/> &nbsp; Server Stop</span></MenuItem>
                <MenuItem onClick={handleClose} style={{color:"grey"}}><span onClick={()=>setRestartServerM(true)} ><AutorenewIcon/> &nbsp; Server Restart</span></MenuItem>
                <MenuItem  onClick={handleClose} style={{color:"grey"}}><span onClick={()=>setReinstallServerM(true)}><DiscFullIcon/> &nbsp; Server Re-install</span></MenuItem>
                <Divider/>
                <MenuItem  onClick={handleClose} style={{color:"red"}}><span onClick={()=>setDestroyServerM(true)}><DeleteIcon/> &nbsp; Server Destroy</span></MenuItem>

            </Menu>
     
        </div>
        
        const status = <div>
                
                
                {spinner && serverId === server.server_id  ? <CircularProgress  style={{color:"#007bfc"}} /> :
                  <div> <span style={{color:"grey", fontSize:"18px"}}>{server.power_status }</span>&nbsp;&nbsp;
                       <IconButton onClick={()=>checkServerStatus(server.server_id,server.route, server.key)}><SlowMotionVideoIcon style={{color:"#007bfc"}}  /> </IconButton> </div>}&nbsp;&nbsp;
            </div>
            
        return {server_data, location, expire_date , billing_type,status, action};
    }

    const closeMessagHandler = ()=>{
        setError(false)
        setMessage("")
    }
    if(loader ) {
        return <TableSkeleton/>
    }
    const rows = []
    if(vpn_type === "All"){

        props.servers.map((server, index)=>{
            return(<div key={index}>
            { server &&  rows.push(createData({...server,key: index}))}
             </div>)
        })
    }
    else{
        props.servers.map((server, index)=>{
            if(server.vpn_type === vpn_type){
             return(<div key={index}>
              { server &&  rows.push(createData({...server,key: index}))}
               </div>)
             }
        })
    }

    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


    return(

        <div>
          <br/>
            <Typography variant="h4" 
            style={{textAlign:"left",color:"#007bfc", fontWeight:"bolder",  width:"100%", background:"linear-gradient(90deg, rgba(224,224,224,100) 0%, rgba(255,255,255,0) 70%)", padding:"20px", borderRadius:"10px"}}>Server table </Typography><br/>
                
            <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={1} lg={1} style={{borderBottom: showtext[0] && "2px solid #007bff", width: showtext[0] && "100%" }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(0);getServers("vultr")}} >Vultr</p>
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={2} lg={2}   style={{borderBottom: showtext[1] && "2px solid #007bff", width: showtext[0] && "100%"  }}>
                  <p className="Profile_Tab"  onClick={()=>{changeRead(1);otherServer("other")}} >Other</p>
               </Grid>
           </Grid>
               <Divider style={{marginTop:"9px"}}/>

                <br/>
                { error && message && 
                    <div className="Error_message">
                        <span className="Message">{message}</span>
                        <p className="Close_Message" onClick={closeMessagHandler}>close</p>
                        </div>}
                {  !error && message &&  <div className="Success_message">
                        <span className="Message">{message}</span>
                    
                        <p className="Close_Message" onClick={closeMessagHandler}>close</p>
                    
                    </div>}
            <br/>
            <div style={{display:"flex", flexFlow:"row-reverse"}}>
            {/* <ServerRouteFilter
               routeProvider ={routeProvider}
               getServers={getServers}
               /> &nbsp; &nbsp; &nbsp; */}
            <VpnFilter
                setVpnType={setVpnType}
                vpn_type={vpn_type}
            />
            </div>
            <br/>

        <Paper className={classes.root}>
             <TableContainer className={classes.container}>
        
                <Table stickyHeader aria-label="sticky table" >
                <TableHead >
                    <TableRow >
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, color:"grey", fontSize:"18px"}}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                        {columns.map((column, index) => {
                            const value = row[column.id];
                        
                            return (
                            <TableCell key={index} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
    </Paper>
      

                {deleteModal &&    <DeleteModal 
                                server={serverData} 
                                modalHandler={deleteModalHandler}
                                serverIndex={serverIndex}
                                modal={deleteModal}/>}  

                {expireDateModal && <ExpiredateUpdateModal 
                                    server={serverData} 
                                    serverIndex={serverIndex}
                                    modalHandler={expireDateModalHandler}
                                    modal={expireDateModal}/>}  
                {deatilsModal && <ServerDetailsModal server={serverData} modalHandler={detailsModalHandler} modal={deatilsModal}/>}  




        {stopServerM &&
            <StopServerModal
               modal = {stopServerM}
               modalHandler = {closeModalHandler}
               server_id = {serverId}
               route = {route}
               token ={props.token}
            />}


            { restartServerM && <RestartServerModal
                    modal = {restartServerM}
                    modalHandler = {closeModalHandler}
                    server_id = {serverId}
                    route = {route}
                    token ={props.token}
            />}

                { labelUpdateM && <LableUpdateMOdal
                    modal = {labelUpdateM}
                    modalHandler = {closeModalHandler}
                    server_id = {serverId}
                    route = {route}
                    token ={props.token}
                    label ={label}
            />}

                { destroyServerM && <DestroyServerModal
                    modal = {destroyServerM}
                    modalHandler = {destroyServerModal}
                    server_id = {serverId}
                    route = {route}
                    token ={props.token}
            />} 
            { reinstallServerM && <ReinstallServerModal
                    modal = {reinstallServerM}
                    modalHandler = {reinstallServerModalHandler}
                    server_id = {serverId}
                    route = {route}
                    token ={props.token}
            />} 
            { renewServerM && <RenewServerModal
                    modal = {renewServerM}
                    server ={serverData}
                    modalHandler = {closeModalHandler}
                    server_id = {serverId}
                    route = {route}
                    token ={props.token}
            />}

            
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        token:state.auth.token,
        servers:state.server.servers
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAddServers :(servers)=> dispatch(actions.all_serve_data(servers)),
        onUpdateServer :(index, server)=> dispatch(actions.update_server_data(index, server)),
        onDeleteServer:(index)=>dispatch(actions.delete_server(index))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServerTable)
