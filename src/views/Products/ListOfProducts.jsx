import React from 'react'
import { useState, useEffect } from 'react'
import productservice from "../../services/productservice"
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const ListOfProducts = () => {
  
    const [products, setProducts] = useState([])
    const [affiche, setAffiche] = useState(false)
    const GetAllProducts = () => {
        productservice.GetAll().then((res)=>{
            console.log(res);
            setProducts(res.data.data)
            setAffiche(true)
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        GetAllProducts()
    },[])
    const [inputText, setInputText] = useState('');
  let inputHandler = (e) =>{
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filterdData = products?.filter((el)=>{
    if (inputText ===""){
      return el;
    } else {
      return (el.name).toLowerCase().includes(inputText)
    }
  })
    const deleteProduct = (id)=> {
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
                productservice.remove(id).then((res)=>{
                    GetAllProducts()
                })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
    if (affiche){
  return (
    <div>
        <div className="row">
    <div className="col-md-12">
     <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">List Products</h3>
      </div>
      <div className="panel-body panel-body-table">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-actions">
            <thead>
              <tr>
                <th width={50}>id</th>
                <th>name</th>
                <th width={100}>Description</th>
                <th width={100}>Quantity</th>
                <th width={100}>Price</th>
                <th width={100}>Subcategory</th>
                <th width={100}>Images</th>
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
                    <td><span className="label label-success">{item.qte}</span></td>
                    <td><span className="label label-success">{item.price}</span></td>
                    <td><span className="label label-success">{item.subcategory?.name}</span></td>
                    <td> {item.images.map((image)=>{
                      return(
                        <td>
                          <img style={{width:"100px"}} src={`http://localhost:3000/file/products/`+ image}></img>
                        </td>
                      )
                    })}
                    </td>
                    <td>
                    <Link to={`/home/updateProduct/${item._id}`}>
                    <button className="btn btn-default btn-rounded btn-sm"><span className="fa fa-pencil" /></button>
                    </Link>
                      
                      
                      <button className="btn btn-danger btn-rounded btn-sm" onClick={(e)=>deleteProduct(item._id)}><span className="fa fa-times" /></button>
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

export default ListOfProducts