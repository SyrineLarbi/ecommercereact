import React, { useState } from 'react'
import "../authen/styleLogIn.css"
import authentification from '../../services/authentification'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
   const [data,setData]= useState({})
   const navigate = useNavigate()
   const onChangeHandler = (e) =>{
    setData({...data,
    [e.target.name] : e.target.value 
})
console.log(data)
}
const onSubmitHandler = (e) =>{
    e.preventDefault();
    authentification.signin(data).then((res)=>{
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data))
        navigate("/home")
    }).catch((err)=>{
        console.log(err);
    })
}
  return (
    <div>
        <div>
            <div className="wrapper">
        <div className="logo">
            <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt />
        </div>
        <div className="text-center mt-4 name">
            Twitter
        </div>
        <form className="p-3 mt-3" onSubmit={onSubmitHandler}>
            <div className="form-field d-flex align-items-center">
            <span className="far fa-user" />
            <input type="text" name="username" id="userName" placeholder="username" onChange={onChangeHandler} />
            </div>
            <div className="form-field d-flex align-items-center">
            <span className="fas fa-key" />
            <input type="password" name="password" id="pwd" placeholder="Password" onChange={onChangeHandler} />
            </div>
            <button className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">
            <a href="#">Forget password?</a> or <a href="/signup">Sign up</a>
        </div>
        </div>
        </div>
    </div>
  )
}

export default LogIn