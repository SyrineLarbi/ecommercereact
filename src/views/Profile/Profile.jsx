import React, { useEffect, useState } from 'react'
import "../Profile/profileStyle.css"
import authentification from '../../services/authentification'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const Profile = () => {
    const [data,setData]=useState()
    const user = JSON.parse(localStorage.getItem('user'));
    const [affiche,setAffiche]=useState((false))
    const id = user.user._id;
    const [image, setImage] = useState([])
    const navigate = useNavigate()
    const onChangeHandler=(e)=>{
        setData({...data,
            [e.target.name] : e.target.value 
        })
        console.log(data)
    }
    const handlerImages = (e) =>{
        setImage(e.target.files)
    }
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('name', data.name)
        formdata.append('username', data.username)
        formdata.append("password",data.password)
        for (let i=0; i<= image.length; i++){
            formdata.append('file', image[i])
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update it!'
          }).then((result) => {
            if (result.isConfirmed) {
                authentification.updateuser(id,formdata).then ((res)=>{
                    console.log(res);
                    navigate('/home')
                }).catch ((err)=>{
                    console.log(err);
                })
              Swal.fire(
                'updated!',
                'Your file has been updated.',
                'success'
              )
            }
          })
    }
    useEffect(()=>{
        authentification.getbyId(id).then((res)=>{
            setData(res.data.data)
            setAffiche(true)
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    if(affiche){
  return (
    <div>
      <div className="container rounded bg-white mt-5 mb-5">
  <div className="row">
    <div className="col-md-3 border-right">
      <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" name="photo" width="150px" src={`http://localhost:3000/file/Users/` + data?.photo} /><span className="font-weight-bold"></span><span className="text-black-50"></span><span> </span></div>
    </div>
    <div className="col-md-5 border-right">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">Profile Settings</h4>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <label className="labels" >name</label>
          <input type="text" onChange={onChangeHandler} className="form-control" name='name' placeholder="first name" defaultValue={data.name} />
          </div>
          <div className="col-md-6"><label className="labels"> username</label><input type="text" className="form-control" defaultValue={data.username} placeholder="surname" name="username" onChange={onChangeHandler} /></div>
        </div>
        <div className="col-md-6">
            <label className="labels" >Password</label>
          <input type="password" onChange={onChangeHandler} className="form-control" name='password' placeholder="password" />
          </div>
        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={onSubmitHandler}>Save Profile</button></div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus" />&nbsp;Experience</span></div><br />
        <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" defaultValue /></div> <br />
        <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" defaultValue /></div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
}
export default Profile