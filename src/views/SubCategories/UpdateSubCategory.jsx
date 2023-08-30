import React, { useEffect, useState } from 'react'
import subcategoryservice from '../../services/subcategoryservice'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import categoryservice from '../../services/categoryservice'

const UpdateSubCategory = () => {
    const [data,setData]= useState({})
    const navigate = useNavigate()
    const [categories,setCategories] = useState({})
    const [affiche,setAffiche]=useState(false)
    const {id}= useParams()
    const GetAllCategories = ()=>{
        categoryservice.GetAll().then((res)=>{
            // console.log(res);
            setCategories(res.data.data)
            setAffiche(true)
            // console.log(categories);
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=> {
        GetAllCategories()
    },[])
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
                subcategoryservice.update(id,data).then ((res)=>{
                    console.log(res);
                    navigate('/home/subcategory')
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
        subcategoryservice.getOne(id).then((res) => {
            console.log(res);
            setData (res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    },[])
    if(affiche){
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
                <div class="form-group">
                                        <label class="col-md-3 col-xs-12 control-label">Categories</label>
                                        <div class="col-md-6 col-xs-12">
                                            <select class="form-control select" onChange={onChangeHandler} name="category" >
                                                <option>{data.category.name}</option>
                                                {categories?.map((category)=>{
                                                    return(
                                                        <option value={category._id}>{category.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <span class="help-block">Select box example</span>
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
}}

export default UpdateSubCategory