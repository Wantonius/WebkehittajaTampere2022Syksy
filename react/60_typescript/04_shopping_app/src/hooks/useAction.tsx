import {useEffect,useState,useReducer} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface AppState {
	list:ShoppingItem[];
	loading:boolean;
}

interface FetchState {
	request:Request;
}

interface Action {
	type:string;
	payload?:any;
}

const initialState:AppState = {
	list:[],
	loading:false
}

const listReducer = (state:AppState,action:Action):AppState => {
	switch(action.type) {
		case "LOADING":
			return {
				...state,
				loading:true
			}
		case "STOP_LOADING":
			return {
				...state,
				loading:false
			}
		case "FETCH_DONE":
			if(action.payload) {
				return {
					...state,
					list:action.payload as ShoppingItem[]
				}
			} else {
				return state;
			}
		default:
			return state;
	}
}

const useAction = ():{ShoppingItem[],boolean,(item:ShoppingItem) => void,(id:number) => void} => {
	
	const [urlRequest,setUrlRequest] = useState<FetchState>({
		request:new Request("",{})
	})
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.request.method) {
				return;
			}
			dispatch({
				type:"LOADING"
			})
			const response = await fetch(urlRequest.request);
			dispatch({
				type:"STOP_LOADING"
			})
			if(!response) {
				console.log("No response");
				return
			}
			if(response.ok) {
				if(urlRequest.request.method === "GET") {
					const list = await response.json();
					dispatch({
						type:"FETCH_DONE",
						list:list
					})
				} else {
					getList();
				}
			} else {
				console.log("Server responded with a status "+response.status+" "+response.statusText)
			}
		}
		
		fetchData();
		
	},[urlRequest.request]);
} 