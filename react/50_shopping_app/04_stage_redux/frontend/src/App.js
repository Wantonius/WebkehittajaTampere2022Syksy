import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useState,useEffect} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
	
	const appState = useSelector(state => state);

	let message = <h4></h4>
	if(appState.login.loading) {
		message = <h4>Loading ...</h4>
	}
	let error = ""
	if(appState.shopping.error) {
		error = appState.shopping.error;
	}
	if(appState.login.error) {
		error = appState.login.error;
	}
	if(error) {
		message = <h4>{error}</h4>
	}
	if(appState.login.isLogged) {
		return (
			<div className="App">
				<Navbar />
				<div style={{height:25, textAlign:"center"}}>
					{message}
				</div>
				<hr/>
				<Routes>
					<Route exact path="/"  element={<ShoppingList />} /> 
					<Route path="/form" element={<ShoppingForm />} />
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
	} else {
		return (
			<div className="App">
				<Navbar />
				<div style={{height:25, textAlign:"center"}}>
					{message}
				</div>
				<hr/>
				<Routes>
					<Route exact path="/"  element={<LoginPage />} />
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>				
			</div>
		)
	}
}

export default App;
