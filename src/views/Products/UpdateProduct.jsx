import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import productservice from '../../services/productservice'
import subcategoryservice from '../../services/subcategoryservice'

const UpdateProduct = () => {
    const [subcategories,setSubCategories] = useState({})
    const [affiche, setAffiche] = useState(false)
    const [data, setData] = useState({})
    const [images, setImages]= useState([])
    const navigate = useNavigate()
    const {id} = useParams()
    const onChangeHandler = (e) =>{
        setData({...data,
        [e.target.name] : e.target.value 
    })
    console.log(data)
    }
    const GetAllSubcatgories = ()=>{
        subcategoryservice.GetAll().then((res)=>{
            setSubCategories(res.data.data)
            setAffiche(true)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const handlerImages = (e) =>{
        setImages(e.target.files)
    }
    const onSubmitHandler = (e)=>{
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
            confirmButtonText: 'Yes, Update it!'
          }).then((result) => {
            if (result.isConfirmed) {
                productservice.update(id,formdata).then ((res)=>{
                    console.log(res);
                    navigate('/home/product')
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
    useEffect(() =>{
        productservice.getOne(id).then((res)=>{
            setData(res.data.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    useEffect(()=>{
        GetAllSubcatgories()
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
              <div style={{marginLeft:"500px"}}>
                <td> {data.images.map((image)=>{
                      return(
                        <td>
                          <img style={{width:"100px"}} src={`http://localhost:3000/file/products/`+ image}></img>
                        </td>
                      )
                    })}
                    </td> 
                </div>  
                                                                                  
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
                <div className="form-group">
                  <label className="col-md-3 col-xs-12 control-label">Quantity</label>
                  <div className="col-md-6 col-xs-12">                                            
                    <div className="input-group">
                      <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                      <input type="number" className="form-control" defaultValue={data.name} name="qte" onChange={onChangeHandler}/>
                    </div>                                            
                    <span className="help-block">This is sample of Name</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 col-xs-12 control-label">Price</label>
                  <div className="col-md-6 col-xs-12">                                            
                    <div className="input-group">
                      <span className="input-group-addon"><span className="fa fa-pencil" /></span>
                      <input type="text" className="form-control" defaultValue={data.price} name="price" onChange={onChangeHandler}/>
                    </div>                                            
                    <span className="help-block">This is sample of Name</span>
                  </div>
                </div>
                <div class="form-group">
                        <label class="col-md-3 col-xs-12 control-label">Subcategory</label>
                        <div class="col-md-6 col-xs-12">
                            <select class="form-control select" onChange={onChangeHandler} name="subcategory" >
                                <option>{data.subcategory.name}</option>
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

export default UpdateProduct