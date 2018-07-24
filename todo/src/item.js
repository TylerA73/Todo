import React, { Component } from 'react';

class Item extends Component {
	render(){
		// return a new list item using the desc prop as the content
		return(
			<li>
				{this.props.desc}
			</li>
		);
	}

}

export default Item;