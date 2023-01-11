import * as actionConstants from './actionConstants';

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