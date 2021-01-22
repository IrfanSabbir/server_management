import * as actionTypes from './actionTypes'

export const auth_success = (token)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        // email:email
    }
}

export const logout = ()=>{
    localStorage.removeItem("token")
    // localStorage.removeItem("email")
    localStorage.removeItem("expiresIn")

    return{
        type:actionTypes.LOG_OUT
    }
}

export const auth_time_out = (expiresIn)=>{
    const time = new Date(expiresIn).getTime() - new Date().getTime()
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        }, time)
    }
}
export const auth_start =(token,  expiresIn)=>{
    console.log(expiresIn)
    return dispatch =>{
        localStorage.setItem("token", token)
        // localStorage.setItem("email", email)
        localStorage.setItem("expiresIn", expiresIn)
        dispatch(auth_success(token))
        dispatch(auth_time_out(expiresIn))
    }
}

export const auth_check = ()=>{
    return (dispatch=>{
        const token = localStorage.getItem("token")
        if(!token){
            dispatch(logout())
        }
        let expiresIn = localStorage.getItem("expiresIn")
        if(expiresIn<=new Date()){
            dispatch(logout())
        }
        // const email = localStorage.getItem("email")
        dispatch(auth_success(token))
        dispatch(auth_time_out(expiresIn))
    })
}