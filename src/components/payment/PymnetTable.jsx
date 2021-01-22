import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
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

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import DeleteIcon from '@material-ui/icons/Delete';


const columns = [
    {id:"payment_date", label:"Date", minWidth:12},
  { id: 'amount', label: 'Amount', minWidth: 100 },
  { id: 'payment_method', label: 'Method', minWidth: 100 },
  {
    id: 'payment_status',
    label: 'Status',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'comment',
    label: 'Comment',
    minWidth: 250,
    // align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
//   {
//     id: 'action',
//     label: 'Action',
//     minWidth: 150,
//     align: 'center',
//     format: (value) => value.toFixed(2),
//   },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: "auto",
    },
});


const PaymentTable = (props)=>{
    const classes = useStyles();
    const [payments, setPayments] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(()=>{
        const getPayments = async ()=>{
            try {
                const headers = {
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+props.token
                }
                const result = await axios.get(process.env.REACT_APP_BASE_URL+"customer_api/payment/", {headers:headers})
                console.log(result)
                setPayments(result.data.payments)
            } catch (error) {
                console.log(error)
            }
        }
        getPayments()
    },[])

    const  createData= (payment) =>{
        let payment_status = "pending"

        if(payment.payment_status === 2){
            payment_status ="success"
        }
        if(payment.payment_status === 3){
            payment_status ="cancle"
        }

        var today = new Date(payment.payment_date);
        var year = today.getFullYear();
        var month = today.getMonth()+1;
        var day = today.getDate();
        var date =day+"-"+month+"-"+year;
      
        // const receved_date = fecha
       
        const payment_date = date
        const amount = payment.amount + " $"
        const payment_method = payment.payment_method
        const comment = payment.comment
        // const action = <div>
        //     <Button variant="contained" color="primary" onClick={()=>setDetailsValue(quote)}><ZoomInIcon/></Button>&nbsp;&nbsp;
        //     <Button variant="contained" color="secondary" onClick={()=>deleteQuote(quote._id)}><DeleteIcon/></Button>  

        // </div>
        return {payment_date, amount, payment_method, payment_status, comment};
    }

    const rows = []
 
    payments.map((payment, index)=>{
     return(<div key={index}>
     { payment &&  rows.push(createData({...payment,key: index}))}

     </div>)
    })

    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return(
        <div>
        <Paper className={classes.root}>
             <TableContainer className={classes.container}>
        
                <Table stickyHeader aria-label="sticky table" >
                <TableHead >
                    <TableRow >
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, backgroundColor:"#007bff", color:"white", fontSize:"20px", fontWeight:"bolder" }}
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
    
        </div>
    )
}

const mapStateToProps = state =>{
    return{
        token:state.auth.token
    }
}
export default connect(mapStateToProps)(PaymentTable)