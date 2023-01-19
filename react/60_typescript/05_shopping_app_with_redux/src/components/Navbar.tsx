import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {AppState} from '../types/states';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {logout} from '../actions/loginActions';

const Navbar:React.FC<{}> = (props) => {
	
	const stateSelector = (state:AppState) => state;
	
	const appState = useSelector(stateSelector);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	let navStyle:React.CSSProperties = {
		backgroundColor:"lightblue",
		height:120
	}
	
	let header = <h2>Shopping App</h2>
	if(appState.login.loading) {
		header = <h2>Loading ...</h2>
	}
	let error = "";
	if(appState.shopping.error) {
		error = appState.shopping.error;
	}
	if(appState.login.error) {
		error = appState.login.error;
	}
	if(error) {
		header = <h2>{error}</h2>
	}
	if(appState.login.isLogged) {
		return(
			<div style={navStyle}>
				{header}
				<ul style={{listStyleType:"none"}}>
					<li><Link to="/">Shopping List</Link></li>
					<li><Link to="/form">Add new item</Link></li>
					<li><Link to="/" onClick={() => dispatch(logout(appState.login.token))}>Logout</Link></li>
				</ul>
			</div>
		)
	} else {
		return(
			<div style={navStyle}>
				{header}
			</div>
		)
	}
}

export default Navbar;