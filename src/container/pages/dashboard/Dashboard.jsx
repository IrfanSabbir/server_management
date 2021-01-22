import React , {useEffect, useState} from 'react'
import {Container} from '@material-ui/core'
import axios from 'axios'
import { connect } from 'react-redux'

import CountReport from '../../../components/dashboard/TopCounts'
const Dashboard = (props)=>{
    const [counts, setCount]= useState({})
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        const userdashboardData = async ()=>{
            try {
                const headers ={
                    "Authorization":"Bearer "+props.token
                }
                const result = await axios.get(process.env.REACT_APP_BASE_URL+"customer_api/server/dashboard_count_report", {headers:headers})
                setCount(result.data.body)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        userdashboardData()
    }, [])
    if(loading) return <p>Loading</p>
    return(
        <Container>
            <CountReport counts={counts}/>
        </Container>
    )

}


const mapStateToProps = state =>{
    return{
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(Dashboard)