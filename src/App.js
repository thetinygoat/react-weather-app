import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import * as config from './config';

class App extends Component {
	state = {
		type: '',
		temp: null,
		lat: null,
		lon: null
	};
	componentDidMount() {
		this.getLocation();
	}
	handleWeatherFetch = () => {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${
				this.state.lat
			}&lon=${this.state.lon}&APPID=${config.API_KEY}`
		).then(res => {
			res.json().then(data => {
				console.log(Math.floor(data.main.temp - 273.15));
			});
		});
	};
	setPosition = position => {
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
		this.setState({
			...this.state,
			lat: position.coords.latitude,
			lon: position.coords.longitude
		});
	};
	getLocation = () => {
		navigator.geolocation.getCurrentPosition(this.setPosition);
	};
	render() {
		return (
			<div>
				<Searchbar />
				<Button>Search</Button>
				<Button clicked={this.handleWeatherFetch} search>
					Get Current Weather
				</Button>
			</div>
		);
	}
}

export default App;
