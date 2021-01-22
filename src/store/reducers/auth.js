import * as actionTypes from '../actions/actionTypes'

let initialState = {
    token:"",
    email:""
}

const  reducer = (state = initialState ,action)=>{
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
           return{
               ...state,
               token:action.token,
            //    email:action.email
           }
        case actionTypes.LOG_OUT:
            return{
                ...state,
                token:"",
                // email:""
            }
        default:
            return state
    }
}

export default reducer