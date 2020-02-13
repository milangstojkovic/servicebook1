import React from 'react';
import './App.css';
import Login from './Components/LoginRegisterComponent/loginComponent';
import Register from './Components/LoginRegisterComponent/registerComponent';
import MechanicComponent from './Components/MechanicComponent/mechanicComponent';
import RegisterUser from './Components/RegisterUserComponent/registerUserComponent';
import RegisterMechanic from './Components/RegisterMechanicComponent/registerMechanicComponent';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <RegisterMechanic />
      </header>
    </div>
  );
}

export default App;
