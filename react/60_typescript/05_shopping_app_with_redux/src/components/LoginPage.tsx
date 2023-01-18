import React,{useState} from 'react'
import {register} from '../actions/loginActions';
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
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		let user = new User(state.username,state.password)
		dispatch(register(user));
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
			<button onClick={onSubmit} name="register">Register</button>
		</form>
	)
}

export default LoginPage;