import React ,{useState} from 'react'

import Skeleton from '@material-ui/lab/Skeleton';


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
import EditIcon from '@material-ui/icons/Edit';
import {IconButton, Divider, Grid} from '@material-ui/core' 





const ServerTableSkeleton = (props)=>{
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const  createData= () =>{
        const server_data =<div>
             <Skeleton variant="rect" width="70%" animation="pulse" height="50px"/><br/> 
             <Skeleton variant="rect" width="100%" animation="wave" height="30px"/>
        </div>
        
        const location =  <Skeleton variant="rect" width="100%" animation="wave" height="30px"/>
        
        const expire_date =<div>
              <Skeleton variant="rect" width="70%" animation="pulse" height="40px"/><br/> 
            </div> 
       
        const action = <div>
            <Skeleton variant="circle" width="50px" height="50px"/>
            <Skeleton variant="circle" width="50px" height="50px"/>
        </div>
        
        const status = <div>
               <Skeleton variant="rect" width="70%" animation="pulse" height="40px"/><br/> 
            </div>
            
        return {server_data, location, expire_date ,status, action};
    }

  

    const rows = []
    rows.push(createData)
    rows.push(createData)
    rows.push(createData)

    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    let jsxBody = 
    <Grid container spacing={2} >
         <Grid item sx= {6} sm={6} md={3} lg={3} >
             <Skeleton variant="rect" width="100%" animation="pulse" height="50px"/><br/> 
         </Grid>
         <Grid item sx= {6} sm={6} md={3} lg={3}  >
             <Skeleton variant="rect" width="100%" animation="wave" height="50px"/><br/> 
         </Grid>
         <Grid item sx= {6} sm={6} md={3} lg={3}  >
             <Skeleton variant="rect" width="100%" animation="pulse" height="50px"/><br/> 
         </Grid>
         <Grid item sx= {6} sm={6} md={3} lg={3}  >
             <Skeleton variant="rect" width="100%" animation="wave" height="50px"/><br/> 
         </Grid>
    </Grid>
    return(

        <div><br/>
           
        {/* <Skeleton variant="rect" width="100%" animation="pulse" height="80px"/><br/>
        <Skeleton variant="rect" width="100%" animation="wave" /><br/> 
        <Skeleton variant="rect" width="100%" animation="wave" /><br/>  */}
        <Typography variant="h4" 
            style={{textAlign:"left",color:"#007bfc", fontWeight:"bolder",  width:"100%", background:"linear-gradient(90deg, rgba(224,224,224,100) 0%, rgba(255,255,255,0) 70%)", padding:"20px", borderRadius:"10px"}}>Server table </Typography><br/>
                
                <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={1} lg={1}>
                  <p className="Profile_Tab"  >Vultr</p>
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={1} lg={1}  >
                  <p className="Profile_Tab"  >Other</p>
               </Grid>
           </Grid>
               <Skeleton style={{marginTop:"-6px"}}/> <br/> <br/>
            {/* <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={2} lg={2} >
                   <Skeleton variant="rect" width="100%" animation="pulse" height="50px"/><br/> 
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={4} lg={4}  >
                  <Skeleton variant="rect" width="100%" animation="wave" height="50px"/><br/> 
               </Grid>
           </Grid> */}
           <Skeleton/>
           <Skeleton/><br/><br/>
            {jsxBody}
           <Skeleton height="4px"/><br/>

            {jsxBody}<br/>
           <Skeleton height="4px"/><br/>

            {jsxBody}
            <Skeleton height="4px"/><br/>
             
            <br/>
            

             <Paper >
    
            </Paper>
      


        </div>
    )
}


export default ServerTableSkeleton
