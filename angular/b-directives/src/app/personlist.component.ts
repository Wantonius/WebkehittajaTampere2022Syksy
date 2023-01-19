import {Component} from '@angular/core'

@Component({
	selector:"person-list",
	templateUrl:"./personlist.component.html"
})
export class PersonList {
	
	list = [
	{
		"firstname":"Matti",
		"lastname":"Meikäläinen"
	},
	{
		"firstname":"Otto",
		"lastname":"Normalverbraucher"
	}
	]
}