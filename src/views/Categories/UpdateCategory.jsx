import React, { useEffect, useState } from 'react'
import categoryservice from '../../services/categoryservice'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
const UpdateCategory = () => {
    const [data,setData]= useState({})
    const navigate = useNavigate()
    const {id}= useParams()
    const onChangeHandler = (e)=>{
        setData({...data,
            [e.target.name] : e.target.value //name of input
         })
         console.log(data);
    }
    const onSubmitHandler= (e)=>{
        e.preventDefault();
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
                categoryservice.update(id,data).then ((res)=>{
                    console.log(res);
                    navigate('/home/category')
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
    useEffect (() => {
        categoryservice.getOne(id).then((res) => {
            console.log(res);
            setData (res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    },[])
  return (
<div>
  <div>
    {/* PAGE CONTENT WRAPPER */}
    <div className="page-content-wrap">
      <div className="row">
        <div className="col-md-12">
          <form className="form-horizontal" onSubmit={onSubmitHandler}>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title"><strong>One Column</strong> Layout</h3>
                <ul className="panel-controls">
                  <li><a href="#" className="panel-remove"><span className="fa fa-times" /></a></li>
                </ul>
              </div>
              <div className="panel-body">                                                                        
                <div className="form-group">
                  <label className="col-md-3 col-xs-12 control-label">Name</label>
                  <div className="col-md-6 col-xs-12">                                            
                    <div className="input-group">
                      <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                      <input type="text" className="form-control" defaultValue={data.name} name="name" onChange={onChangeHandler}/>
                    </div>                                            
                    <span className="help-block">This is sample of Name</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 col-xs-12 control-label">Description</label>
                  <div className="col-md-6 col-xs-12">                                            
                    <textarea className="form-control" rows={5}  defaultValue={data.description} onChange={onChangeHandler} name='description' />
                    <span className="help-block">Default textarea field</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <button className="btn btn-default">Clear Form</button>                                    
              <button className="btn btn-primary pull-right">Submit</button>
            </div>
          </form></div>
      </div>
    </div>                    
  </div>
  {/* END PAGE CONTENT WRAPPER */}    
</div>

  )
}

export default UpdateCategory