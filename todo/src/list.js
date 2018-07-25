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
	}
	// when this component mounts, get the data from the API
	componentDidMount(){
		// store the data in the list state variable
		// log the error to the console if this cannot be done
		axios.get(this.state.url)
			 .then(response => this.setState({ list: response.data }))
			 .catch(error => console.log(error));

	}
	// function used to create a new Item component for each item returned by the API
	item(id, description){
		// return the new Item component using the description as a prop
		return(
			<Item key={ id } desc={ description } id={ id }/>
		);
	}
	render(){

		// empty array of items that will be populated with Item components
		let items = [];
		// use the list state variable
		let list = this.state.list;
		// loop through the list
		for(let item in list){
			// push a new component to the items array
			items.push(
				this.item(
					list[item]["id"],
					list[item]["description"]
				)
			);
		}
		return(
			<div className="card">
				<ul className="list-group">
					{ items }
				</ul>
			</div>
		);
	}

}

export default List;