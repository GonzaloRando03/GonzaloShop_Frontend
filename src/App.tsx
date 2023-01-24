import React from 'react';
import Main from './components/Main';
import Home from './components/Home';
import Register from './components/Register';
import Products from './components/Products';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router";
import './styles/App.css';
import ProductOne from './components/ProductOne';
import Cart from './components/Cart';


const App:React.FC = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Main><Home/></Main>}/>
        <Route path='/home' element={<Main><Home/></Main>}/>
        <Route path='/products' element={<Main><Products/></Main>}/>
        <Route path='/products/:search' element={<Main><Products/></Main>}/>
        <Route path='/product/:name' element={<Main><ProductOne/></Main>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="*" element={<div>404</div> }/>
      </Routes>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
      />
    </div>
  );
}

export default App;
