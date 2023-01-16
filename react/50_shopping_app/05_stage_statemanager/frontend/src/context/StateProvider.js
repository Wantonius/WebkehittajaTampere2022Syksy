import {useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import * as actionConstants from '../types/actionConstants';

const getInitialState = () => {
	if(sessionStorage.getItem("state")) {
		let state = JSON.parse(sessionStorage.getItem("state"))
		return state ;
	} else {
		return {
			list:[],
			isLogged:false,
			token:"",
			error:"",
			loading:false
		}
	}
}

const initialState = getInitialState();

const saveToStorage = (state) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const stateReducer = (state,action) => {
	let tempState = {};
	switch(action.type) {
		case actionConstants.LOADING:
			return {
				...state,
				error:"",
				loading:true
			}
		case actionConstants.STOP_LOADING:
			return {
				...state,
				loading:false
			}
		case actionConstants.REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"Register success"
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGIN_SUCCESS:
			tempState = {
				...state,
				token:action.token,
				isLogged:true
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_SUCCESS:
			tempState = {
				list:[],
				isLogged:false,
				token:"",
				loading:false,
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.LOGOUT_FAILED:
			tempState = {
				list:[],
				isLogged:false,
				token:"",
				loading:false,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.FETCH_LIST_SUCCESS:
			tempState = {
				...state,
				list:action.list
			}
			saveToStorage(tempState);
			return tempState;
		case actionConstants.ADD_ITEM_SUCCESS:
		case actionConstants.REMOVE_ITEM_SUCCESS:
		case actionConstants.EDIT_ITEM_SUCCESS:
			return state;
		case actionConstants.REGISTER_FAILED:
		case actionConstants.LOGIN_FAILED:
		case actionConstants.FETCH_LIST_FAILED:
		case actionConstants.ADD_ITEM_FAILED:
		case actionConstants.REMOVE_ITEM_FAILED:
		case actionConstants.EDIT_ITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveToStorage(tempState);
			return tempState;
		default:
			return state
	}
}

const StateProvider = (props) => {
	
	const [state,dispatch] = useReducer(stateReducer,initialState);
	
	return (
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateProvider;