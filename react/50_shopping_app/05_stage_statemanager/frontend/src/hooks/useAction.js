import {useState,useEffect,useContext} from 'react';
import * as actionConstants from '../types/actionConstants';
import useAppState from './useAppState';
import ActionContext from '../context/ActionContext';

const useAction = () => {
	
	const {dispatch} = useContext(ActionContext);
	
	const [state,setState] = useState({
		url:"",
		request:{},
		action:""
	})
	
	const {token} = useAppState();
	
	//Contact backend using useEffect()
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!state.url) {
				return;
			}
			dispatch({
				type:actionConstants.LOADING
			})
			const response = await fetch(state.url,state.request);
			dispatch({
				type:actionConstants.STOP_LOADING
			})
			if(!response) {
				dispatch({
					type:actionConstants.LOGOUT_FAILED,
					error:"Server never responded. Failed to communicate. Logging you out."
				})
				return;
			}
			if(response.ok) {
				switch(state.action) {
					case "register":
						dispatch({
							type:actionConstants.REGISTER_SUCCESS
						})
						return;
					default:
						return state;
				}
			} else {
				let errorMessage = "Server responded with a status "+response.status+" "+response.statusText
				switch(state.action) {
					case "register":
						if(response.status === 409) {
							dispatch({
								type:actionConstants.REGISTER_FAILED,
								error:"Username already in use"
							})
							return;
						}
						dispatch({
							type:actionConstants.REGISTER_FAILED,
							error:"Register failed. "+errorMessage
						})
						return;
					default:
						return state;
				}
			}
		}
		
		fetchData();
		
	},[state])

	const register = (user) => {
		setState({
			url:"/register",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	
	return {register}
}

export default useAction;