import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import {useState,useEffect} from 'react';

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
					case "additem":
						return;
					default:
						return;
				}
			} else {
				switch(urlRequest.action) {
					case "additem":
						console.log("Failed to add item. Server responded with a status "+response.status+" "+response.statusText);
						return;
					default:
						return;
				}
			}
		}
		
		fetchData();
		
	},[urlRequest])
	
	// REST API
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
		
	return (
		<div className="App">
			<ShoppingForm addItem={addItem}/>
		</div>
	);
}

export default App;
