const NamedChildren = (props) => {

	const cardStyle = {
		height:200,
		width:150,
		textAlign:"center",
		margin:10,
		backgroundColor:"lightblue"
	}
	
	const {header,media,content} = props;
	
	return(
		<div style={cardStyle}>
			<>{header}</>
			{media ? <>{media}</>:<></>}
			<>{content}</>
		</div>
	)
}

export default NamedChildren;