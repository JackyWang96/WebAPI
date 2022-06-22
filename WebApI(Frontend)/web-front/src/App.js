import logo from './logo.svg';
import './App.css';

import{Home}from './Home';
import{Department}from './Department';
import{Employee}from './Employee';
import{Navigation}from './Navigation';

import{BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
          Web App by Jack
      </h3>
      <Navigation/>

      <Routes>
        <Route path='/' component={Home} exact/>
        <Route path='/department' component={Department} exact/>
        <Route path='/employee' component={Employee} exact/>
        


      </Routes>


      
    </div>
    </BrowserRouter>
  );
}

export default App;
