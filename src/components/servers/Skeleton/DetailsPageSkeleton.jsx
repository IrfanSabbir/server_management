import React, {useEffect, useState} from 'react'

import {Container, Grid, Button, Divider, IconButton} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';


const detailspageSkelaton = ()=>{
    

        let jsx_body = <div>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    
                     <Skeleton variant="rect" width="100%" animation="pulse" height="50px"/><br/> 
                     <Skeleton variant="rect" width="100%" animation="wave" height="30px"/><br/> 
                     <Skeleton variant="rect" width="100%" height="20px"/><br/> 
                  
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Skeleton variant="rect" width="100%" animation="wave" height="50px"/><br/> 
                     <Skeleton variant="rect" width="100%" animation="pulse" height="30px"/><br/> 
                     <Skeleton variant="rect" width="100%" height="20px"/><br/> 
                  
                </Grid> 
                <Grid item xs={12} sm={6} md={4} lg={4}>
                     <Skeleton variant="rect" width="100%" animation="pulse" height="50px"/><br/> 
                     <Skeleton variant="rect" width="100%" animation="pulse" height="30px"/><br/> 
                     <Skeleton variant="rect" width="100%" height="20px"/><br/> 
                  
                </Grid>
            </Grid>
             <br/><br/><br/>
             <Grid container spacing={5}>
                 <Grid item xs={12} sm={8} md={4} lg={4}>
                     <div>
                        <Skeleton variant="rect" width="90%" animation="pulse" height="20px"/><br/> 
                        <Skeleton variant="rect" width="70%"  animation="wave" height="20px"/><br/> 
                        <Skeleton variant="rect" width="40%" animation="pulse" height="20px"/><br/> 
                        <Skeleton variant="rect" width="100%" animation="wave" height="20px"/><br/> 
                    
                     </div>
                 </Grid>
                 <Grid item xs={12} sm={8} md={4} lg={4}>
                     <div>
                     <Skeleton variant="rect" width="90%" animation="pulse" height="20px"/><br/> 
                     <Skeleton variant="rect" width="70%"  animation="wave" height="20px"/><br/> 
                     <Skeleton variant="rect" width="40%" animation="pulse" height="20px"/><br/> 
                     <Skeleton variant="rect" width="100%" animation="wave" height="20px"/><br/> 
                    

                     </div>
                 </Grid>
                 <Grid item xs={12} sm={8} md={4} lg={4}>
                     <div>
                     <Skeleton variant="rect" width="90%" animation="pulse" height="20px"/><br/> 
                     <Skeleton variant="rect" width="70%"  animation="wave" height="20px"/><br/> 
                     <Skeleton variant="rect" width="40%" animation="pulse" height="20px"/><br/> 
                     <Skeleton variant="rect" width="100%" animation="wave" height="20px"/><br/> 
                    

                     </div>
                 </Grid>
             </Grid>
        </div>
    

    return(
        <Container>
        
                 <br/><br/>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                     
                     <Skeleton variant="rect" width="100%" animation="pulse" height="50px"/><br/> 
                     <Skeleton variant="rect" width="100%" animation="wave" height="30px"/><br/> 
                     <Skeleton variant="rect" width="100%" height="20px"/><br/> 
                  
                </Grid>
                <Grid item  xs={4} sm={3} md={1} lg={1}>
                   <Skeleton variant="circle" width="50px" height="50px"/>
                </Grid>
                <Grid item  xs={4} sm={3} md={1} lg={1}>
                   <Skeleton variant="circle" width="50px" height="50px"/>
                </Grid>
                <Grid item  xs={4} sm={3} md={1} lg={1}>
                   <Skeleton variant="circle" width="50px" height="50px"/>
                </Grid>
                <Grid item  xs={4} sm={3} md={1} lg={1}>
                   <Skeleton variant="circle" width="50px" height="50px"/>
                </Grid>
               
            </Grid>
            <Grid container spacing={2} >
               <Grid item sx= {3} sm={2} md={2} lg={2} >
                   <Skeleton variant="rect" width="100%" animation="pulse" height="50px"/><br/> 
               </Grid>&nbsp;&nbsp;
               <Grid item sx= {3} sm={2} md={4} lg={4}  >
                  <Skeleton variant="rect" width="100%" animation="wave" height="50px"/><br/> 
               </Grid>
           </Grid>
           <Skeleton/>
           <br/><br/>
           {jsx_body}

        
 
             
        </Container>
    )
}


export default detailspageSkelaton

