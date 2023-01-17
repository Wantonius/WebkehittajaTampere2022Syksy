import React,{useState,useEffect} from 'react';

interface State {
	seconds:number
}

const StatefulComponent:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		seconds:0
	})
	
	const tick = ():void => {
		setState((state) => {
			return {
				seconds:state.seconds+1
			}
		})
	}
	
	useEffect(() => {
		let interval = setInterval(tick,1000);
		
		return () => clearInterval(interval);
	},[])
	
	return(
		<h2>{state.seconds} since you entered the page</h2>
	)
	
}

export default StatefulComponent;