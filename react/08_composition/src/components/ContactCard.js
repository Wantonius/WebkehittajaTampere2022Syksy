const ContactCard = (props) => {

	const cardStyle = {
		height:200,
		width:150,
		textAlign:"center",
		margin:10,
		backgroundColor:"lightgreen"
	}
	
	return(
		<div style={cardStyle}>
			{props.children}
		</div>
	)
}

export default ContactCard;