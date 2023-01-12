import {logoutFailed,loading,stopLoading} from './loginActions';
import * as actionConstants from './actionConstants';

//ASYNC THUNKS

export const getList = (token) => {
	return async (dispatch) => {
		let request = {
			method:"GET",
			headers:{
				token:token
			}
		}
		dispatch(loading());
		const response = await fetch("/api/shopping",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(fetchListFailed("Failed loading shopping information. Server never responded. Try again later"))
			return;
		}
		if(response.ok) {
			let list = await response.json();
			if(!list) {
				dispatch(fetchListFailed("Failed to parse shopping information. Try again later"))
				return;
			}
			dispatch(fetchListSuccess(list));
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session has expired. Logging you out"))
				return;
			}
			dispatch(fetchListFailed("Failed to fetch shopping information. Server responded with a status "+response.status+" "+response.statusText))
		}
	}
}

export const add = (token,item) => {
	return async (dispatch) => {
		let request = {
			method:"POST",
			headers:{
				"Content-Type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		}
		dispatch(loading());
		const response = await fetch("/api/shopping",request);
		dispatch(stopLoading());
		if(!response) {
			dispatch(addItemFailed("Failed to add new item. Server never responded. Try again later."))
			return;
		}
		if(response.ok) {
			dispatch(addItemSuccess());
			dispatch(getList(token));
		} else {
			if(response.status === 403) {
				dispatch(logoutFailed("Your session has expired. Logging you out"))
				return;
			}
			dispatch(addItemFailed("Failed to add new item. Server responded with a status "+response.status+" "+response.statusText))
		}
	}
}

//ACTION CREATORS

const fetchListSuccess = (list) => {
	return {
		type:actionConstants.FETCH_LIST_SUCCESS,
		list:list
	}
}

const fetchListFailed = (error) => {
	return {
		type:actionConstants.FETCH_LIST_FAILED,
		error:error
	}
}

const addItemSuccess = () => {
	return {
		type:actionConstants.ADD_ITEM_SUCCESS
	}
}

const addItemFailed = (error) => {
	return {
		type:actionConstants.ADD_ITEM_FAILED,
		error:error
	}
}