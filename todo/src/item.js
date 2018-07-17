import React, { Component } from 'react';

class Item extends Component {
	render(){
		return(
			<li>
				Item {this.props.desc}
			</li>
		);
	}

}

export default Item;