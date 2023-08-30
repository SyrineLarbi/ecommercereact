import http from './axiosContext'

const signup=(data)=>{
    return http.post("/auth/signup",data)
}
const signin=(data)=>{
    return http.post("/auth/signin",data)
}

const logout=()=>{
    return http.get('/auth/logout');
}
const refresh=()=>{
    return http.get('/auth/refresh');
}
const getbyId =(id)=>{
    return http.get(`/users/${id}`);
}
const updateuser= (id,data)=>{
    return http.put(`/users/${id}`,data)
}

export default {signup,signin,logout,refresh,getbyId,updateuser}