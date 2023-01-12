import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {useState,useEffect} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

function App() {
	
	const [state,setState] = useState({
		list:[],
		isLogged:false,
		token:"",
		error:"",
		loading:false
	})
	
	const appState = useSelector(state => state);
	
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
			if(appState.login.isLogged) {
				getList(appState.login.token);
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
							let tempData = {
								...state,
								list:data
							}
							saveToStorage(tempData);
							return tempData;
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
					case "login":
						let temp = await response.json();
						if(!temp) {
							setError("Failed to parse login information. Try again later.");
							return
						}
						setState((state) => {
							let tempData = {
								...state,
								isLogged:true,
								token:temp.token
							}
							saveToStorage(tempData);
							return tempData;
						})
						getList(temp.token);
						return;
					case "logout":
						clearState("");
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
					case "login":
						setError("Login failed."+errorMessage);
						return;
					case "logout":
						clearState("Server responded with an error. Logging you out!");
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	//REST API
	
	const getList = (token) => {
		let tempToken = appState.login.token;
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
					"token":appState.login.token
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
					"token":appState.login.token
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
						"token":appState.login.token},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
	


	//RENDERING

	let message = <h4></h4>
	if(appState.login.loading) {
		message = <h4>Loading ...</h4>
	}
	let error = ""
	if(appState.shopping.error) {
		error = appState.shopping.error;
	}
	if(appState.login.error) {
		error = appState.login.error;
	}
	if(error) {
		message = <h4>{error}</h4>
	}
	if(appState.login.isLogged) {
		return (
			<div className="App">
				<Navbar />
				<div style={{height:25, textAlign:"center"}}>
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
				<Navbar />
				<div style={{height:25, textAlign:"center"}}>
					{message}
				</div>
				<hr/>
				<Routes>
					<Route exact path="/"  element={<LoginPage />} />
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>				
			</div>
		)
	}
}

export default App;
