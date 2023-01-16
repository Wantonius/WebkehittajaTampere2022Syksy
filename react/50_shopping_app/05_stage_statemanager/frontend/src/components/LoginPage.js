import {useState} from 'react';
import useAction from '../hooks/useAction';

const LoginPage = (props) => {
	
	const [state,setState] = useState({
		username:"",
		password:""
	})
	
	const {register,setError} = useAction();

	const onChange = (event) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			setError("Username must be atleast four and password atleast eight characters long");
			return;
		}
		let user = {
			...state
		}
		if(event.target.name === "register") {
			register(user)
		} else {
			props.login(user)
		}
	}
	
	return(
		<div style={{
			backgroundColor:"lightblue",
			width:"40%",
			margin:"auto"
		}}>
			<form className="mb-3">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text"
						name="username"
						id="username"
						className="form-control"
						onChange={onChange}
						value={state.username}/>
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						name="password"
						id="password"
						className="form-control"
						onChange={onChange}
						value={state.password}/>
				<button onClick={onSubmit} name="register" className="btn btn-secondary">Register</button>
				<button onClick={onSubmit} name="login" className="btn btn-secondary">Login</button>
			</form>
		</div>
	)
}

export default LoginPage;