import React, { Component } from 'react';
import './App.css';
import MechanicComponent from './Components/MechanicComponent/mechanicComponent';
import RegisterUser from './Components/RegisterUserComponent/registerUserComponent';
import RegisterMechanic from './Components/RegisterMechanicComponent/registerMechanicComponent';
import HomeComponent from './Components/HomeComponent/homeComponent';
import NavComponent from './Components/NavComponent/navComponent';
import LoginComponent from './Components/LoginComponent/loginComponent';
import RecordsMechanic from "./Components/RecordsMechanic/recordsMechanic";
import EditRecord from './Components/EditRecordComponent/editRecordComponent';
import UserComponent from './Components/UserComponent/userComponent';


const App = () => {
  if (localStorage.getItem("mechanicid"))
  return (
    <div className="App">
      <nav>
        <NavComponent/>
      </nav>
      <div className="container">
        <UserComponent/>
        </div>
    </div>
  ); else if(localStorage.getItem("user"))
  return (
    <div className="App">
      <nav>
        <NavComponent/>
      </nav>
      <div className="container">
        <MechanicComponent/>
        </div>
    </div>
  ); else
  return (
    <div className="App">
      <nav>
        <NavComponent/>
      </nav>
      <div className="container">
        <HomeComponent/>
        </div>
    </div>
  );
}

export default App;
{/* <header className="App-header">
<UserComponent/>
<button onClick={e=>localStorage.clear()}>LOGOUT</button>
</header> */}