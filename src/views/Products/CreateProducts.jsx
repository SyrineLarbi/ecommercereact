import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import subcategoryservice from '../../services/subcategoryservice'
import productservice from '../../services/productservice'


const CreateProducts = () => {
    const [data,setData] = useState({})
    const navigate = useNavigate()
    const [subcategories,setSubCategories] = useState({})
    const [images, setImages]= useState([])
    const [affiche,setAffiche]=useState(false)
    const GetAllSubCategories = ()=>{
        subcategoryservice.GetAll().then((res)=>{
          setSubCategories(res.data.data)
          setAffiche(true)
      }).catch((err)=>{
          console.log(err);
      })
  }
  useEffect(()=> {
    GetAllSubCategories()
  },[])
  const onChangeHandler = (e) => {
    setData({...data,
    [e.target.name] : e.target.value})
    console.log(data);
}
const handlerImages = (e) =>{
    setImages(e.target.files)
}
const onSubmitHandler = (e) =>{
    e.preventDefault();
    const formdata = new FormData()
        formdata.append('name', data.name)
        formdata.append('description', data.description)
        formdata.append('qte', data.qte)
        formdata.append('price', data.price)
        formdata.append('subcategory', data.subcategory)
        for (let i=0; i<= images.length; i++){
            formdata.append('files', images[i])
        }
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
      }).then((result) => {
        if (result.isConfirmed) {
            productservice.create(formdata).then ((res)=>{
                console.log(res);
                navigate('/home/product')
            }).catch ((err)=>{
                console.log(err);
            })
          Swal.fire(
            'Created!',
            'Your file has been created.',
            'success'
          )
        }
      })
}
if (affiche){


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
                      <input type="text" className="form-control"  name="name" onChange={onChangeHandler}/>
                    </div>                                            
                    <span className="help-block">This is sample of Name</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 col-xs-12 control-label">Description</label>
                  <div className="col-md-6 col-xs-12">                                            
                    <textarea className="form-control" rows={5}  onChange={onChangeHandler} name='description' />
                    <span className="help-block">Default textarea field</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 col-xs-12 control-label">Quantity</label>
                  <div className="col-md-6 col-xs-12">                                            
                    <div className="input-group">
                      <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                      <input type="number" className="form-control"  name="qte" onChange={onChangeHandler}/>
                    </div>                                            
                    <span className="help-block">This is sample of Name</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 col-xs-12 control-label">Price</label>
                  <div className="col-md-6 col-xs-12">                                            
                    <div className="input-group">
                      <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                      <input type="text" className="form-control"  name="price" onChange={onChangeHandler}/>
                    </div>                                            
                    <span className="help-block">This is sample of Name</span>
                  </div>
                </div>
                <div class="form-group">
                                        <label class="col-md-3 col-xs-12 control-label">SubCategories</label>
                                        <div class="col-md-6 col-xs-12">
                                            <select class="form-control select" onChange={onChangeHandler} name="subcategory" >
                                                <option>selecta subcategory</option>
                                                {subcategories?.map((subcategory)=>{
                                                    return(
                                                        <option value={subcategory._id}>{subcategory.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <span class="help-block">Select box example</span>
                                        </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 col-xs-12 control-label">Image</label>
                    <div class="col-md-6 col-xs-12">                                                                                                                                        
                        <input type="file" class="fileinput btn-primary" name="images" id="filename" title="Browse file" onChange={handlerImages}/>
                        <span class="help-block">Input type file</span>
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
}

export default CreateProducts