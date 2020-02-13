import React from 'react';
import './App.css';
import Login from './Components/LoginRegisterComponent/loginComponent';
import Register from './Components/LoginRegisterComponent/registerComponent';
import MechanicComponent from './Components/MechanicComponent/mechanicComponent';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <MechanicComponent/>
      </header>
    </div>
  );
}

export default App;
