import http from './axiosContext'

const signup=(data)=>{
    return http.post("/auth/signup")
}
const signin=(data)=>{
    return http.post("/auth/signin")
}

const logout=()=>{
    return http.get('/auth/logout');
}
const refresh=()=>{
    return http.get('/auth/refresh');
}

export default {signup,signin,logout,refresh}