import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import {useState,useEffect} from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';

function App() {
	
	const [state,setState] = useState({
		list:[]
	})
	
	const [urlRequest,setUrlRequest] = useState({
		url:"",
		request:{},
		action:""
	})
	
	// USEEFFECT
	
	useEffect(() => {
		getList();
	},[])
	
	useEffect(() => {
		
		const fetchData = async () => {
			if(!urlRequest.url) {
				return;
			}
			const response = await fetch(urlRequest.url,urlRequest.request);
			if(!response) {
				console.log("Server did not respond!");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist":
						const data = await response.json();
						if(!data) {
							console.log("Failed to parse shopping data");
							return;
						}
						setState({
							list:data
						})
						return;
					case "additem":
					case "removeitem":
					case "edititem":
						getList();
						return;
					default:
						return;
				}
			} else {
				switch(urlRequest.action) {
					case "getlist":
						console.log("Failed to fetch shopping list. Server responded with a status "+response.status+" "+response.statusText);
						return;						
					case "additem":
						console.log("Failed to add item. Server responded with a status "+response.status+" "+response.statusText);
						return;
					case "removeitem":
						console.log("Failed to remove item. Server responded with a status "+response.status+" "+response.statusText);
						return;
					case "edititem":
						console.log("Failed to edit item. Server responded with a status "+response.status+" "+response.statusText);
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	//REST API
	
	const getList = () => {
		setUrlRequest({
			url:"/api/shopping",
			request:{
				method:"GET"
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
					"Content-Type":"application/json"
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
				method:"DELETE"
			},
			action:"removeitem"
		})
	}
	
	const editItem = (item) => {
		setUrlRequest({
			url:"/api/shopping/"+item.id,
			request:{
				method:"PUT",
				headers:{"Content-Type":"application/json"},
				body:JSON.stringify(item)
			},
			action:"edititem"
		})
	}
		
	return (
		<div className="App">
			<Navbar/>
			<hr/>
			<Routes>
				<Route exact path="/"  element={<ShoppingList list={state.list} removeItem={removeItem} editItem={editItem}/>} /> 
				<Route path="/form" element={<ShoppingForm addItem={addItem}/>} />			
			</Routes>
		</div>
	);
}

export default App;
