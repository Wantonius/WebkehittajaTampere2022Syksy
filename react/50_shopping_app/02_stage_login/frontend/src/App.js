import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useState,useEffect} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';

function App() {
	
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:"",
		error:"",
		loading:false
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	//HELPER FUNCTIONS
	
	const saveToStorage = (state) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}

	const setLoading = (loading) => {
		setState((state) => {
			return {
				...state,
				error:"",
				loading:loading
			}
		})
	}
	
	const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const clearState = (error) => {
		let tempState = {
			list:[],
			isLogged:false,
			error:error,
			token:"",
			loading:false
		}
		saveToStorage(tempState);
		setState(tempState);
	}
	
	// USEEFFECT
	
	useEffect(() => {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			setState(state);
			if(state.isLogged) {
				getList(state.token);
			}
		}		
	},[])
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			setLoading(true);
			const response = await fetch(urlRequest.url,urlRequest.request);
			setLoading(false);
			if(!response) {
				console.log("Server did not respond!");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							setError("Failed to parse shopping data. Try again later!");
							return;
						}
						setState((state) => {
							return {
								...state,
								list:data
							}
						})
						return;
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
						return;
					case "register":
						setError("Register success!");
						return;
					default:
						return;
				}
			} else {
				if(response.status === 403) {
					clearState("Your session has expired. Logging you out!");
					return;
				}
				let errorMessage = " Server responded with a status "+response.status+" "+response.statusText
				switch(urlRequest.action) {
					case "getlist":
						setError("Failed to fetch shopping list."+errorMessage);
						return;						
					case "additem":
						setError("Failed to add item."+errorMessage);
						return;
					case "removeitem":
						setError("Failed to remove item."+errorMessage);
						return;
					case "edititem":
						setError("Failed to edit item."+errorMessage);
						return;
					case "register":
						if(response.status === 409) {
							setError("Username already in use!");
							return;
						} else {
							setError("Register failed."+errorMessage);
							return;
						}
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	//REST API
	
	const getList = (token) => {
		let tempToken = state.token;
		if(token) {
			tempToken = token;
		}
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET",
				headers:{
					"token":tempToken
				}
			},
			action:"getlist"
		})
	}
	
	const addItem = (item) => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"token":state.token
				},
				body:JSON.stringify(item)
			},
			action:"additem"
		})
		
	}
	
	const removeItem = (id) => {
		setUrlRequest({
			url:"/api/shopping/"+id,
			request:{
				method:"DELETE",
				headers:{
					"token":state.token
				}
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json",
						"token":state.token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	
	const register = (user) => {
		setUrlRequest({
			url:"/register",
			request:{
				method:"POST",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(user)
			},
			action:"register"
		})
	}
	
	const login = (user) => {}

	let message = <h4></h4>
	if(state.loading) {
		message = <h4>Loading ...</h4>
	}
	if(state.error) {
		message = <h4>{state.error}</h4>
	}
	if(state.isLogged) {
		return (
			<div className="App">
				<Navbar/>
				<div style={{height:40, textAlign:"center"}}>
					{message}
				</div>
				<hr/>
				<Routes>
					<Route exact path="/"  element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>} /> 
					<Route path="/form" element={<ShoppingForm addItem={addItem}/>} />
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</div>
		);
	} else {
		return (
			<div className="App">
				<Navbar/>
				<div style={{height:40, textAlign:"center"}}>
					{message}
				</div>
				<hr/>
				<Routes>
					<Route exact path="/"  element={<LoginPage register={register} login={login} setError={setError}/>} />
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>				
			</div>
		)
	}
}

export default App;
