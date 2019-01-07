import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';

class App extends Component {
	componentDidMount() {
		this.getLocation();
	}
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
			</div>
		);
	}
}

export default App;
