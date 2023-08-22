import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './views/Layout';
import ListCategories from './views/Categories/ListCategories';
import UpdateCategory from './views/Categories/UpdateCategory';
import AddCategory from './views/Categories/AddCategory';
import ListSubCategories from './views/SubCategories/ListSubCategories';
import UpdateSubCategory from './views/SubCategories/UpdateSubCategory';
import AddSubCategory from './views/SubCategories/AddSubCategory';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route path='/' element={<Layout/>}></Route>
          <Route path='/category' element={<ListCategories/>} ></Route>
          <Route path='/updateCategory/:id' element={<UpdateCategory/>} ></Route>
          <Route path='/createCategory' element={<AddCategory/>} ></Route>
          <Route path='/subcategory' element={<ListSubCategories/>} ></Route>
          <Route path='/updateSubCategory/:id' element={<UpdateSubCategory/>} ></Route>
          <Route path='/createSubCategory' element={<AddSubCategory/>} ></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
