import {loading,stopLoading,logoutFailed} from './loginActions';
import ShoppingItem from '../models/ShoppingItem';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import * as actionConstants from '../types/actionConstants';

//ASYNC THUNKS


const handleFetch = async (request:Request,act:string,dispatch:ThunkDispatch<any,any,AnyAction>,token:string) => {
	dispatch(loading());
	const response = await fetch(request);
	dispatch(stopLoading());
	if(!response) {
		dispatch(logoutFailed("There was no response from the server. Logging you out!"))
		return;
	}
	if(response.ok) {
		switch(act) {
			case "getlist":
				let temp = await response.json();
				if(!temp) {
					dispatch(fetchItemFailed(actionConstants.FETCH_LIST_FAILED,"Failed to parse shopping information. Try again later"))
					return;
				}
				let list = temp as ShoppingItem[];
				dispatch(fetchListSuccess(list));
				return;
			case "add":
				dispatch(fetchItemSuccess(actionConstants.ADD_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			case "remove":
				dispatch(fetchItemSuccess(actionConstants.REMOVE_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			case "edit":
				dispatch(fetchItemSuccess(actionConstants.EDIT_ITEM_SUCCESS));
				dispatch(getList(token));
				return;
			default:
				return;
		}
	} else {
		
	}
}

//ACTION CREATORS

const fetchListSuccess = (list:ShoppingItem[]) => {
	return {
		type:actionConstants.FETCH_LIST_SUCCESS,
		list:list
	}
}

const fetchItemFailed = (type:string,error:string) => {
	return {
		type:type,
		error:error
	}
}

const fetchItemSuccess = (type:string) => {
	return {
		type:type
	}
}