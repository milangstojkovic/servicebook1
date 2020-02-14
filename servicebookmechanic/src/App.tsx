import React from 'react';
import './App.css';
import Login from './Components/LoginComponent/loginComponent';
import MechanicComponent from './Components/MechanicComponent/mechanicComponent';
import RegisterUser from './Components/RegisterUserComponent/registerUserComponent';
import RegisterMechanic from './Components/RegisterMechanicComponent/registerMechanicComponent';
import LoginComponent from './Components/LoginComponent/loginComponent';
import UserComponent from './Components/UserComponent/userComponent';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <UserComponent/>
        <button onClick={e=>localStorage.clear()}>LOG OUT</button>
      </header>
    </div>
  );
}


export default App;
