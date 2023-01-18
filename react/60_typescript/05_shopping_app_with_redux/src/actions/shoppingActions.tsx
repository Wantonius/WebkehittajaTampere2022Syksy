import {loading,stopLoading,logoutFailed} from './loginActions';
import ShoppingItem from '../models/ShoppingItem';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import * as actionConstants from '../types/actionConstants';

//ASYNC THUNKS

export const getList = (token:string) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		let request = new Request("/api/shopping",{
			method:"GET",
			headers:{
				"token":token
			}
		})
		handleFetch(request,"getlist",dispatch,token)
	}
}

export const add = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		let request = new Request("/api/shopping",{
			method:"POST",
			headers:{
				"Content-type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		})
		handleFetch(request,"add",dispatch,token)
	}
}

export const remove = (token:string,id:number) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		let request = new Request("/api/shopping/"+id,{
			method:"DELETE",
			headers:{
				"token":token
			}
		})
		handleFetch(request,"remove",dispatch,token)
	}
}

export const edit = (token:string,item:ShoppingItem) => {
	return (dispatch:ThunkDispatch<any,any,AnyAction>) => {
		let request = new Request("/api/shopping/"+item.id,{
			method:"PUT",
			headers:{
				"Content-type":"application/json",
				"token":token
			},
			body:JSON.stringify(item)
		})
		handleFetch(request,"edit",dispatch,token)
	}
}

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
		if(response.status === 403) {
			dispatch(logoutFailed("Your session has expired. Logging you out."))
			return;
		}
		let errorMessage = " Server responded with a status "+response.status+" "+response.statusText
		switch(act) {
			case "getlist":
				dispatch(fetchItemFailed(actionConstants.FETCH_LIST_FAILED,"Failed to fetch shopping list."+errorMessage))
				return;
			case "add":
				dispatch(fetchItemFailed(actionConstants.ADD_ITEM_FAILED,"Failed to add new item."+errorMessage))
				return;
			case "remove":
				dispatch(fetchItemFailed(actionConstants.REMOVE_ITEM_FAILED,"Failed to remove item."+errorMessage))
				return;
			case "edit":
				dispatch(fetchItemFailed(actionConstants.EDIT_ITEM_FAILED,"Failed to edit item."+errorMessage))
				return;
			default:
				return;
		}
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