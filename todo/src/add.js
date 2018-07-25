import React, { Component } from 'react';
import './add.css';

class Add extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="input-group add-form">
				<input type="text" className="form-control"/>
				<span className="input-group-btn">
					<button className="btn btn-primary">Add</button>
				</span>
			</div>
		);
	}
}

export default Add;