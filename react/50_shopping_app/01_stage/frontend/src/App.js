import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';

function App() {
	
	const addItem = (item) => {}
	
	return (
		<div className="App">
			<ShoppingForm addItem={addItem}/>
		</div>
	);
}

export default App;
