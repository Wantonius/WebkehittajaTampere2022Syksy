import React,{useState} from 'react'
import {register,login} from '../actions/loginActions';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import User from '../models/User';

interface State {
	username:string;
	password:string;
}

const LoginPage:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onRegister = (event:React.SyntheticEvent) => {
		event.preventDefault();
		let user = new User(state.username,state.password)
		dispatch(register(user));
	}
	
	const onLogin = (event:React.SyntheticEvent) => {
		event.preventDefault();
		let user = new User(state.username,state.password)
		dispatch(login(user));
	}
	
	return(
		<form>
			<label htmlFor="username">Username</label>
			<input type="text"
					name="username"
					id="username"
					onChange={onChange}
					value={state.username}/>
			<br/>
			<label htmlFor="password">Password</label>
			<input type="password"
					name="password"
					id="password"
					onChange={onChange}
					value={state.password}/>
			<br/>
			<button onClick={onRegister} name="register">Register</button>
			<button onClick={onLogin} name="login">Login</button>
		</form>
	)
}

export default LoginPage;