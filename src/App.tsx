import React from 'react';
import { Routes, Route } from "react-router";
import './styles/App.css';
import Main from './components/Main';
import Home from './components/Home';
import Register from './components/Register';
import { ToastContainer } from 'react-toastify';


const App:React.FC = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Main><Home/></Main>}/>
        <Route path='/home' element={<Main><Home/></Main>}/>
        <Route path='/register' element={<Register/>}/>
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
