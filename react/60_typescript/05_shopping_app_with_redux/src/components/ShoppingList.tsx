import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {useDispatch,useSelector} from 'react-redux';
import {AppState} from '../types/states';
import {remove,edit} from '../actions/shoppingActions';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList:React.FC<{}> = (props) => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const appSelector = (state:AppState) => state;
	
	const appState = useSelector(appSelector);
	
	const dispatch:ThunkDispatch<any,any,AnyAction> = useDispatch();
	
	const changeMode = (mode:string,index:number) => {
		if(mode === "remove") {
			setState({
				removeIndex:index,
				editIndex:-1
			})
		}
		if(mode === "edit") {
			setState({
				removeIndex:-1,
				editIndex:index
			})
		}
		if(mode === "cancel") {
			setState({
				removeIndex:-1,
				editIndex:-1
			})
		}
	}
	
	const removeItem = (id:number) => {
		dispatch(remove(appState.login.token,id));
		changeMode("cancel",0);
	}
	
	const editItem = (item:ShoppingItem) => {
		dispatch(edit(appState.login.token,item));
		changeMode("cancel",0);
	}
	
	let items = appState.shopping.list.map((item,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={item.id} item={item} changeMode={changeMode} removeItem={removeItem}/>
			)
		}
		if(state.editIndex === index) {
			return (
				<EditRow key={item.id} item={item} changeMode={changeMode} editItem={editItem}/>
			)
		}
		return (
			<Row key={item.id} item={item} index={index} changeMode={changeMode}/>
		)
	})
	
	return(
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{items}
			</tbody>
		</table>
	)
}

export default ShoppingList;