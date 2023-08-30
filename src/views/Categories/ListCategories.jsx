import React from 'react'
import { useState, useEffect } from 'react'
import categoryservice from '../../services/categoryservice'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


const ListCategories = () => {
 
    const [categories,setCategories] = useState([])
    const [affiche,setAffiche]=useState(false)
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
    const [inputText, setInputText] = useState('');
    let inputHandler = (e) =>{
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
    const filterdData = categories?.filter((el)=>{
      if (inputText ===""){
        return el;
      } else {
        return (el.name).toLowerCase().includes(inputText)
      }
    })
    const deleteCategory = (id)=>{
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
                categoryservice.remove(id).then((res)=>{
                    GetAllCategories()
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
        <h3 className="panel-title">List Categories</h3>
        <li className="xn-search">
          <form role="form">
            <input type="text" onChange={inputHandler} name="search" placeholder="Search..." />
          </form>
        </li>  
      </div>
      <div className="panel-body panel-body-table">
        <div className="table-responsive">

          <table className="table table-bordered table-striped table-actions">
            <thead>
              <tr>
                <th width={50}>id</th>
                <th>name</th>
                <th width={100}>Description</th>
                <th width={100}>SubCategories</th>
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
                    <td> {item.subCategories.map((subCategory)=>{
                      return(
                      
                        <tr>
                          {subCategory.name}
                        </tr>
                      )
                    })}
                    </td>
                    <td>
                      <Link to={`/home/updateCategory/${item._id}`}>
                      <button className="btn btn-default btn-rounded btn-sm"><span className="fa fa-pencil" /></button>
                      </Link>
                      <button className="btn btn-danger btn-rounded btn-sm" onClick={(e)=>deleteCategory(item._id)}><span className="fa fa-times" /></button>
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

export default ListCategories