import http from './axiosContext'

const create=(data)=>{
    return http.post("/Products")
}

const GetAll=()=>{
    return http.get('/Products');
}

const getOne = (id)=>{
    return http.get(`/Products/${id}`);
}
const update = (id,Data)=>{
    return http.put(`/Products/${id}`,Data);
};

const remove=(id)=>{
    return http.delete(`/Products/${id}`);
};

export default {GetAll,create,getOne,update,remove}