export default class ShoppingItem {

	public id:number = 0;
	public type:string = "";
	public count:number = 0;
	public price:number = 0;
	
	constructor(type:string,count:number,price:number,id:number) {
		this.id = id;
		this.type = type;
		this.count = count;
		this.price = price;
	}
}