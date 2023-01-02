import {useState,useEffect} from 'react';

const StatefulComponent = (props) => {
	
	const [state,setState] = useState({
		seconds:0
	})
	
	useEffect(() => {
		
		let interval = setInterval(() => tick(),1000);
		
		return () => clearInterval(interval);
	
	},[])
	
	const tick = () => {
		setState((state) => {
			return {
				seconds:state.seconds+1
			}
		})
	}
	
	return(
		<h2>{state.seconds} since you entered the page</h2>
	)
}

export default StatefulComponent;