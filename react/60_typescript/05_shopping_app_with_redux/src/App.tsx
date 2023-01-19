import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppState} from './types/states';

function App() {
	
	const stateSelector = (state:AppState) => state;
	
	const appState = useSelector(stateSelector);
	
	if(appState.login.isLogged) {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Routes>
					<Route path="/" element={<ShoppingList/>}/>
					<Route path="/form" element={<ShoppingForm/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);		
	} else {
		return (
			<div className="App">
				<Navbar/>
				<hr/>
				<Routes>
					<Route path="/" element={<LoginPage/>}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);	
	}
	

}

export default App;
