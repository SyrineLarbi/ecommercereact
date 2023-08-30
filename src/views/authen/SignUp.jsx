import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authentification from '../../services/authentification'

const SignUp = () => {
    const [data,setData] = useState({})
    const navigate = useNavigate()
    const [images, setImages]= useState([])
    const onChangeHandler = (e) =>{
        setData({...data,
            [e.target.name] : e.target.value
        })
        console.log(data);
    }
    const handlerImages = (e) =>{
        setImages(e.target.files)
    }
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('name', data.name)
        formdata.append('username', data.username)
        formdata.append('password', data.password)
        for (let i=0; i<= images.length; i++){
            formdata.append('file', images[i])
        }
        authentification.signup(formdata).then((res)=>{
            console.log(res);
            navigate("/")
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
            <span className="far fa-user" />
            <input type="text" name="name" id="name" placeholder="name" onChange={onChangeHandler} />
            </div>
            <div className="form-field d-flex align-items-center">
            <span className="fas fa-key" />
            <input type="password" name="password" id="pwd" placeholder="Password" onChange={onChangeHandler} />
            </div>
            <div class="form-group">
                    <label class="col-md-3 col-xs-12 control-label">Image</label>
                    <div class="col-md-6 col-xs-12">                                                                                                                                        
                        <input type="file" class="fileinput btn-primary" name="photo" id="filename" title="Browse file" onChange={handlerImages}/>
                        <span class="help-block">Input type file</span>
                    </div>
                </div>
            <button className="btn mt-3">Sign Up</button>
        </form>
        <div className="text-center fs-6">
            <a href="#">You already have an account</a> or <a href="#">LogIN</a>
        </div>
        </div>
        </div>
    </div>
  )
}

export default SignUp