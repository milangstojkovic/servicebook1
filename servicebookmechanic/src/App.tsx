import React, { Component } from 'react';
import './App.css';
import Login from './Components/LoginRegisterComponent/loginComponent';
import Register from './Components/LoginRegisterComponent/registerComponent';
<<<<<<< HEAD
import './Components/LoginRegisterComponent/loginReg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import MechanicComponent from './Components/MechanicComponent/mechanicComponent';
import RegisterUser from './Components/RegisterUserComponent/registerUserComponent';
import RegisterMechanic from './Components/RegisterMechanicComponent/registerMechanicComponent';

>>>>>>> 4ac93bea76ad97a34554a8683072773a9bf8e01e
const App = () => {
  return (
    <div className="App">
      <header className="App-header">
<<<<<<< HEAD
        <div className="row border rounded">
        <Register/>
      <Login/>
      </div>
=======
        <RegisterMechanic />
>>>>>>> 4ac93bea76ad97a34554a8683072773a9bf8e01e
      </header>
    </div>
  );
}

export default App;
