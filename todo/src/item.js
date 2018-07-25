import React, { Component } from 'react';
//import ReactDOM from 'react';
import * as MaterialDesign from 'react-icons/lib/md';
import axios from 'axios';

class Item extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: this.props.id,
			desc: this.props.desc
		}
		this.deleteItem = this.deleteItem.bind(this);
	}
	deleteItem(){
		axios.delete("http://localhost:8080/api/v1/items",{
			id: this.state.id,
		})
		console.log(this.state.id);
		//.then(ReactDOM.render());
	}
	render(){
		// return a new list item using the desc prop as the content
		return(
			<li className="list-group-item d-flex justify-content-between align-items-center">
				{this.state.desc}
				<span>
					<button className="btn btn-outline-danger btn-delete" onClick={ this.deleteItem }>
						<MaterialDesign.MdDelete/>
					</button>
				</span>
			</li>
		);
	}

}

export default Item;