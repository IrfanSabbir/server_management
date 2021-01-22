import * as actionTypes from './actionTypes'

export const all_serve_data = (servers)=>{
    return{
        type:actionTypes.ALL_SERVER_DATA,
        servers:servers
    }
}

export const update_server_data = (index, server)=>{
    console.log(index)
    console.log(server)
    return{
        type:actionTypes.UPDATE_SERVER_DATA,
        index:index,
        server
    }
}

export const delete_server = (index)=>{
    return{
        type:actionTypes.DELETE_SERVER_DATA,
        index,
    }
}