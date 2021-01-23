import React,{useState,useRef} from 'react'

import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import { TextField, Grid, Button,Container, Divider} from '@material-ui/core'

const Serverinputs = (props)=>{
   
      
    const style={
        width:"100%",
        marginTop:"20px",
        paddingBottm:"20px",
        fontSize:"30px"
    }

    // let jsx_body  = return(
    //      for(let i=0; i<props.totalFields ; i++){
    //     <Grid container spacing={3}>
    //     <Grid item xs={12} sm={6} md={6} lg={6}>
    //         <TextField 
    //             variant="outlined" required type="text"  
    //             onChange={(event)=>{props.setLabel(i, event)}}
    //             label="label"
    //             InputProps={{ style:{ fontSize:25} }}
    //             placeholder="enter label"
    //             style={style}
    //         />
    //     </Grid>
    //     <Grid item xs={12} sm={6} md={6} lg={6}>
    //         <TextField 
    //             variant="outlined" 
    //             required type="text"  
    //             onChange={(event)=>props.setHostname(i,event)}
    //             placeholder="hostname"
    //             value={props.fields[i].hostname || ""}
    //             InputProps={{ style:{ fontSize:25} }}
    //             style={style}
    //         />
    //     </Grid>
    // </Grid>}
    // )
    return(
        <Container style={{marginBottom:"60px"}} fixed>

        <p className="Title_text_black">Server Hostname & Label</p> <br/>
          
          {props.fields.map((field, idx) => {
                    return (
                    <div key={`${field}-${idx}`}>
                         <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField 
                                    variant="outlined" required type="text"  
                                    onChange={(event)=>{props.setLabel(idx, event)}}
                                    label="label"
                                    InputProps={{ style:{ fontSize:25} }}
                                    placeholder="enter label"
                                    style={style}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField 
                                    variant="outlined" 
                                    required type="text"  
                                    onChange={(event)=>props.setHostname(idx,event)}
                                    placeholder="hostname"
                                    value={field.hostname || ""}
                                    InputProps={{ style:{ fontSize:25} }}
                                    style={style}
                                />
                            </Grid>
                        </Grid> 
                        <br/>
                        <hr style={{backgroundColor:"#007bff", width:"60%"}}/>

                        
                    </div>
                    );
                })} 
            {/* <Button  onClick={() => props.handleAdd()}><AddCircleRoundedIcon fontSize="large" color="primary"/></Button> */}

          <br/><br/><br/>
            
        </Container>    
    )
}

export default Serverinputs


// <Grid container spacing={3}>
// <Grid item xs={12} sm={6} md={6} lg={6}>
//    <TextField 
//        variant="outlined" required type="text"  
//        onChange={(event)=>{props.setLabel(event.target.value);props.setHostname(event.target.value)}}
//        label="label"
//        InputProps={{ style:{ fontSize:25} }}
//        placeholder="enter label"
//        style={style}
//    />
// </Grid>
// <Grid item xs={12} sm={6} md={6} lg={6}>
//    <TextField 
//        autoComplete ={props.label}
//        variant="outlined" 
//        required type="text"  
//        onChange={(event)=>props.setHostname(event.target.value)}
//        placeholder="hostname"
//        value={props.hostname}
//        InputProps={{ style:{ fontSize:25} }}
//        style={style}
//    />
// </Grid>
// </Grid> 