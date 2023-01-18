import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import ShoppingForm from './components/ShoppingForm';

function App() {
  return (
    <div className="App">
		<LoginPage/>
		<ShoppingForm/>
    </div>
  );
}

export default App;
