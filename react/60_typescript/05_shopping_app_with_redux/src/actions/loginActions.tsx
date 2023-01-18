import * as actionConstants from '../types/actionConstants';
import User from '../models/User';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

interface Token {
	token:string;
}

//ASYNC THUNKS

export const register = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		let request = new Request("/register",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		})
		handleLogin(request,"register",dispatch);
		}
}

export const login = (user:User) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		let request = new Request("/login",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		})
		handleLogin(request,"login",dispatch);
		}
}

export const logout = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		let request = new Request("/logout",{
			method:"POST",
			headers:{
				"Content-Type":"application/json",
				"token":token
			}
		})
		handleLogin(request,"logout",dispatch);
		}
}

const handleLogin = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>) => {
	dispatch(loading());
	const response = await fetch(request);
	dispatch(stopLoading());
	if(!response) {
		dispatch(logoutFailed("No response from the server. Logging you out"));
		return;
	}
	if(response.ok) {
		switch(act) {
			case "register":
				dispatch(registerSuccess());
				return;
			case "login":
				let temp = await response.json();
				if(!temp) {
					dispatch(loginFailed("Failed to parse login data. Try again later."))
					return;
				}
				let data = temp as Token;
				dispatch(loginSuccess(data.token));
				return;
			case "logout":
				dispatch(logoutSuccess());
				return;
			default:
				return;
		}
	} else {
		let errorMessage:string = "Server responded with a status "+response.status+" "+response.statusText
		switch(act) {
			case "register":
				if(response.status === 409) {
					dispatch(registerFailed("Username is already in use"))
					return;
				}
				dispatch(registerFailed("Register failed. "+errorMessage))
				return;
			case "login":
				dispatch(loginFailed("Login failed. "+errorMessage));
				return;
			case "logout":
				dispatch(logoutFailed(errorMessage+" Logging you out."));
				return;
			default:
				return;
		}
	}
}
//ACTION CREATORS

export const loading = () => {
	return {
		type:actionConstants.LOADING
	}
}

export const stopLoading = () => {
	return {
		type:actionConstants.STOP_LOADING
	}
}

const registerSuccess = () => {
	return {
		type:actionConstants.REGISTER_SUCCESS
	}
}

const registerFailed = (error:string) => {
	return {
		type:actionConstants.REGISTER_FAILED,
		error:error
	}
}

const loginSuccess = (token:string) => {
	return {
		type:actionConstants.LOGIN_SUCCESS,
		token:token
	}
}

const loginFailed = (error:string) => {
	return {
		type:actionConstants.LOGIN_FAILED,
		error:error
	}
}

const logoutSuccess = () => {
	return {
		type:actionConstants.LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error:string) => {
	return {
		type:actionConstants.LOGOUT_FAILED,
		error:error
	}
}