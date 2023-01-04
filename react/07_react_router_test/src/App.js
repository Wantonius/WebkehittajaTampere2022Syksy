import logo from './logo.svg';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Secret from './components/Secret';
import {Route,Routes,Link,Navigate} from 'react-router-dom';
function App() {
  return (
    <div className="App">
		<ul style={{listStyleType:"none"}}>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/about">About</Link></li>
		</ul>
		<hr/>
		<Routes>
			<Route exact path="/" element={<Home/>} />
			<Route path="/about" element={<About/>} />
			<Route path="/secret" element={<Secret/>} />
			<Route path="*" element={<Navigate to="/"/>} />
		</Routes>
    </div>
  );
}

export default App;
