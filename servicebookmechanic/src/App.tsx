import React from 'react';
import './App.css';
import Login from './Components/LoginRegisterComponent/loginComponent';
import Register from './Components/LoginRegisterComponent/registerComponent';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Register/>
      <Login/>
      </header>
    </div>
  );
}

export default App;
