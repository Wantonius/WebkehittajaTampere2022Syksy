import {useNavigate} from 'react-router-dom';

const About = (props) => {

	const navigate = useNavigate();
	
	return (
		<>
			<h2>This is an example of React Router</h2>
			<button onClick={() => navigate("/secret")}>Go to secret page!</button>
		</>
	)
}

export default About;