import React, { Component } from 'react';
import './App.css';
import Login from './Components/LoginRegisterComponent/loginComponent';
import Register from './Components/LoginRegisterComponent/registerComponent';
import './Components/LoginRegisterComponent/loginReg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row border rounded">
        <Register/>
      <Login/>
      </div>
      </header>
    </div>
  );
}

export default App;
