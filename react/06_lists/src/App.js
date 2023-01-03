import logo from './logo.svg';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import {useState} from 'react';

function App() {
	
	const [state,setState] = useState({
		list:[],
		id:100
	})

	
	const addContact = (contact) => {
		contact.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(contact),
				id:state.id+1
			}
		})
	}
	
	const removeContact = (id) => {
		setState((state) => {
			let tempList = state.list.filter(contact => contact.id !== id)
			return {
				...state,
				list:tempList
			}
		})
	}
	return (
		<div className="App">
			<ContactForm addContact={addContact}/>
			<hr/>
			<ContactList list={state.list} removeContact={removeContact}/>
		</div>
  );
}

export default App;
