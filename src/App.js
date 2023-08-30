import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './views/Layout';
import ListCategories from './views/Categories/ListCategories';
import UpdateCategory from './views/Categories/UpdateCategory';
import AddCategory from './views/Categories/AddCategory';
import ListSubCategories from './views/SubCategories/ListSubCategories';
import UpdateSubCategory from './views/SubCategories/UpdateSubCategory';
import AddSubCategory from './views/SubCategories/AddSubCategory';
import ListOfProducts from './views/Products/ListOfProducts';
import UpdateProduct from './views/Products/UpdateProduct';
import CreateProducts from './views/Products/CreateProducts';
import LogIn from './views/authen/LogIn';
import SignUp from './views/authen/SignUp';
import Profile from './views/Profile/Profile';
function App() {
  const Privateroute = ({children})=>{
    if(!localStorage.getItem('user')){
      return <Navigate to='/'></Navigate>
  }
  return children;
}
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Privateroute><Home/></Privateroute>}>
          <Route path='/home' element={<Privateroute><Layout/></Privateroute>}></Route>
          <Route path='/home/category' element={<Privateroute><ListCategories/></Privateroute>} ></Route>
          <Route path='/home/updateCategory/:id' element={<Privateroute><UpdateCategory/></Privateroute>} ></Route>
          <Route path='/home/createCategory' element={<Privateroute><AddCategory/></Privateroute>} ></Route>
          <Route path='/home/subcategory' element={<Privateroute><ListSubCategories/></Privateroute>} ></Route>
          <Route path='/home/updateSubCategory/:id' element={<Privateroute><UpdateSubCategory/></Privateroute>} ></Route>
          <Route path='/home/createSubCategory' element={<Privateroute><AddSubCategory/></Privateroute>} ></Route>
          <Route path='/home/product' element={<Privateroute><ListOfProducts/></Privateroute>} ></Route>
          <Route path='/home/updateProduct/:id' element={<Privateroute><UpdateProduct/></Privateroute>} ></Route>
          <Route path='/home/createProduct' element={<Privateroute><CreateProducts/></Privateroute>} ></Route>
          <Route path='/home/profile' element={<Profile/>} ></Route>
        </Route>
        <Route path='/' element={<LogIn/>} ></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
