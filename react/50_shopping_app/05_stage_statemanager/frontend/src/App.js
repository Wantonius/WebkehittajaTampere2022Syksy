import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useEffect} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import useAppState from './hooks/useAppState';
import useAction from './hooks/useAction';
function App() {
	
	const state = useAppState();

	const {getList} = useAction();
	
	useEffect(() => {
		if(state.isLogged) {
			getList();
		}
	},[state.isLogged])

	//RENDERING

	let message = <h4></h4>
	if(state.loading) {
		message = <h4>Loading ...</h4>
	}
	if(state.error) {
		message = <h4>{state.error}</h4>
	}
	if(state.isLogged) {
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
