import ShoppingItem from '../models/ShoppingItem';
import React from 'react';

interface Props {
	item:ShoppingItem;
	removeItem:(id:number) => void;
	changeMode:(mode:string,index:number) => void;
}

const RemoveRow:React.FC<Props> = (props:Props) => {
	
	return(
		<tr>
			<td>{props.item.type}</td>
			<td>{props.item.count}</td>
			<td>{props.item.price}</td>
			<td><button onClick={() => props.changeMode("cancel",0)}>Cancel</button></td>
			<td><button onClick={() => props.removeItem(props.item.id)}>Confirm</button></td>
		</tr>
	)
}

export default RemoveRow;