import React, { Component } from 'react';
import './App.css';
import Login from './Components/LoginComponent/loginComponent';
import MechanicComponent from './Components/MechanicComponent/mechanicComponent';
import RegisterUser from './Components/RegisterUserComponent/registerUserComponent';
import RegisterMechanic from './Components/RegisterMechanicComponent/registerMechanicComponent';
import HomeComponent from './Components/HomeComponent/homeComponent';
import NavComponent from './Components/NavComponent/navComponent';


const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <HomeComponent />
      </header>
    </div>
  );
}


export default App;
