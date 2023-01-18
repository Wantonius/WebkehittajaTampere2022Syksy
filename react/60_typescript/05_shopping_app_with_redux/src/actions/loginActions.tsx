import * as actionConstants from '../types/actionConstants';
import User from '../models/User';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

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

export const logoutFailed = (error:string) => {
	return {
		type:actionConstants.LOGOUT_FAILED,
		error:error
	}
}