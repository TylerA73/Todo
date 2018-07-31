import React, { Component } from 'react';
import Item from './item';
import axios from 'axios';
import './list.css';

class List extends Component {
	constructor(props){
		super(props);
		// State variables to be used
		this.state = {
			// url of the API 
			url: 'http://localhost:8080/api/v1/items',
			// list to store returned items from the API
			list: null,
		};
		this.item = this.item.bind(this);
		this.makeList = this.makeList.bind(this);
		this.getList = this.getList.bind(this);
	}
	// when this component mounts, get the data from the API
	componentDidMount(){
		this.getList();
	}
	getList(){
		// store the data in the list state variable
		// log the error to the console if this cannot be done
		axios.get(this.state.url)
			 .then(response => {
			 	this.makeList(response.data)
			 }).catch(error => console.log(error));
	}
	// function used to create a new Item component for each item returned by the API
	item(id, description, remove){
		// return the new Item component using the description as a prop
		return(
			<Item 
				key={ id } 
				desc={ description } 
				id={ id }
				remove={this.getList}
			/>
		);
	}
	makeList(todoList){

		let items = [];
		// loop through the list
		for(let item in todoList){
			// push a new component to the items array
			items.push(

				// create the item component
				this.item(
					todoList[item]["id"],
					todoList[item]["description"],
					item
				)
			);
		}

		this.setState({ list: items });
		console.log(this.state.list);
	}
	render(){
		return(
			<div className="card">
				<ul className="list-group">
					{ this.state.list }
				</ul>
			</div>
		);
	}

}

export default List;