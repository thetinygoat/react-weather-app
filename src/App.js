import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';

class App extends Component {
	showPosition = position => {
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
	};
	getLocation = () => {
		navigator.geolocation.getCurrentPosition(this.showPosition);
	};
	render() {
		return (
			<div>
				<Searchbar />
				<Button>Search</Button>
				<Button clicked={this.getLocation} search>
					Get Current Weather
				</Button>
			</div>
		);
	}
}

export default App;
