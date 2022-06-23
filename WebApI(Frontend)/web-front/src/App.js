import logo from './logo.svg';
import './App.css';

import {Home} from './Home.js';
import {Department} from './Department';
import {Employee} from './Employee.js';
import{Navigation} from './Navigation';

import{BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
          Employee Management System
      </h3>
      <Navigation/>
      {/* 路由地址; */}
      <Routes>
        <Route path='/' element={<Home />} exact/>
        <Route path='/Department' element={<Department />} />
        <Route path='/Employee' element={<Employee />} />
      </Routes>



      
    </div>
    </BrowserRouter>
  );
}

export default App;
