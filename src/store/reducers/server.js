import * as actionTypes from '../actions/actionTypes'

let initialState ={
    servers :[]
}

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ALL_SERVER_DATA:
            return{
                ...state,
                servers :action.servers
            }
        case actionTypes.UPDATE_SERVER_DATA:
            let allServer = [...state.servers]
            
            allServer[action.index] = action.server
            // console.log("store")
            // console.log(action.index)
            // console.log(action.server)

            return{
                ...state,
                servers:allServer
            }    
        case actionTypes.DELETE_SERVER_DATA:
            let allServerData = [...state.servers]
            allServerData.splice(action.index,1)
            return{
                ...state,
                servers:allServerData
            }    
        default :
           return state     
    }
}

export default reducer