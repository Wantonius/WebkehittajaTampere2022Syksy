import * as actionConstants from './actionConstants';
import {getList} from './shoppingActions';

//ASYNC THUNKS

export const register = (user) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		const response = await fetch("/register",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(registerFailed("Server never responded. Register failed!"))
			return;
		}
		if(response.ok) {
			dispatch(registerSuccess());
		} else {
			if(response.status === 409) {
				dispatch(registerFailed("Username is already in use"))
			} else {
				dispatch(registerFailed("Register failed. Server responded with a status "+response.status+" "+response.statusText))
			}
		}
	}
}

export const login = (user) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		const response = await fetch("/login",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(loginFailed("Server never responded. Login failed."))
			return;
		}
		if(response.ok) {
			let data = await response.json();
			if(!data) {
				dispatch(loginFailed("Failed to parse login information. Login failed. Try again later."))
				return;
			}
			dispatch(loginSuccess(data.token))
			dispatch(getList(data.token));
		} else {
			dispatch(loginFailed("Login failed. Server responded with a status "+response.status+" "+response.statusText))
		}
	}
}

export const logout = (token) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{
				token:token
			}
		}
		dispatch(loading());
		const response = await fetch("/logout",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(logoutFailed("Server never responded. Logging you out."))
			return;
		}
		if(response.ok) {
			dispatch(logoutSuccess());
		} else {
			dispatch(logoutFailed("Server responded with a status "+response.status+" "+response.statusText+". Logging you out."))
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

export const registerFailed = (error) => {
	return {
		type:actionConstants.REGISTER_FAILED,
		error:error
	}
}

const loginSuccess = (token) => {
	return {
		type:actionConstants.LOGIN_SUCCESS,
		token:token
	}
}

const loginFailed = (error) => {
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

export const logoutFailed = (error) => {
	return {
		type:actionConstants.LOGOUT_FAILED,
		error:error
	}
}