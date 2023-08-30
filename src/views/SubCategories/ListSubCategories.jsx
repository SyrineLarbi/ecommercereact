import React, { useEffect, useState } from 'react'
import subcategoryservice from '../../services/subcategoryservice'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'



const ListSubCategories = () => {
    const [subCategories,setSubCategories] = useState([])
    const [affiche, setAffiche] = useState(false)
    const GetAllSubCategories = () => {
        subcategoryservice.GetAll().then((res) => {
            setSubCategories(res.data.data)
            console.log(res);
            setAffiche(true)
            console.log(subCategories);
        }).catch((err) =>{
            console.log(err);
        })
    }
    useEffect(() =>{
        GetAllSubCategories()
    },[])
    const [inputText, setInputText] = useState('');
  let inputHandler = (e) =>{
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filterdData = subCategories?.filter((el)=>{
    if (inputText ===""){
      return el;
    } else {
      return (el.name).toLowerCase().includes(inputText)
    }
  })
    const deleteSubCategory = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                subcategoryservice.remove(id).then((res)=>{
                    GetAllSubCategories()
                })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
    if(affiche){
        return (
        <div>
         <div className="row">
          <div className="col-md-12">
           <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">List SubCategories</h3>
            </div>
            <div className="panel-body panel-body-table">
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-actions">
                  <thead>
                    <tr>
                      <th width={50}>id</th>
                      <th width={100}>name</th>
                      <th width={100}>Description</th>
                       <th width={100}>Products</th> 
                       <th width={100}>Category</th> 
                      <th width={100}>actions</th>
                    </tr>
                  </thead>
                  <tbody> 
                      {filterdData?.map((item)=>{
                          return(
                          <tr id="trow_1">
                          <td className="text-center">{item._id}</td>
                          <td><strong>{item.name}</strong></td>
                          <td><span className="label label-success">{item.description}</span></td>
                          <td> {item.products.map((product)=>{
                              console.log(product);
                            return(
                            
                              <tr>
                                {product.name}
                              </tr>
                            )
                          })}
                          </td>
                          <td>{item.category?.name}</td>
                          <td>
                            <Link to={`/home/updateSubCategory/${item._id}`}>
                            <button className="btn btn-default btn-rounded btn-sm"><span className="fa fa-pencil" /></button>
                            </Link>
                            <button className="btn btn-danger btn-rounded btn-sm" onClick={(e)=> deleteSubCategory(item._id)}><span className="fa fa-times" /></button>
                          </td>
                        </tr>
                      )})}                                           
                  </tbody>
                </table>
              </div>                                
             </div>
            </div>                                                
          </div>
        </div>
      </div>
        )
        }
    }

export default ListSubCategories