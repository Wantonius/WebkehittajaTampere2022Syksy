import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingItem from './models/ShoppingItem';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

interface State {
	list:ShoppingItem[];
	id:number;
}

function App() {
	
	const [state,setState] = useState<State>({
		list:[],
		id:100
	})
	
	const addItem = (item:ShoppingItem) => {
		item.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(item),
				id:state.id+1
			}
		})
	}
	
	const removeItem = (id:number) => {
		setState((state) => {
			let templist = state.list.filter(item => item.id !== id)
			return {
				...state,
				list:templist
			}
		})
	}
	
	return (
		<div className="App">
			<ShoppingForm addItem={addItem}/>
			<hr/>
			<ShoppingList list={state.list} removeItem={removeItem}/>
		</div>
	);
}

export default App;
