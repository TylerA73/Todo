import React, { Component } from 'react';
import List from './list';
import Add from './add';
import './App.css';

class App extends Component {
  render() {
    return (

    	// The application
    	<div className="App">
	     	<div className="container-fluid content">
		     	<div className="add-item">
		     		<Add/>
	    		</div>
			    <div className="flex-row">
			        <List/>
		        </div>
	      	</div>
      	</div>
    );
  }
}

export default App;
