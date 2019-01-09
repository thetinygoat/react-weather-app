import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import * as config from './config';
import styled from 'styled-components';
import Spinner from './components/Spinner/Spinner';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

const SearchBarWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

class App extends Component {
	state = {
		type: '',
		temp: null,
		lat: null,
		lon: null,
		placeName: '',
		loading: false
	};
	componentDidMount() {
		this.getLocation();
	}
	handleCurrentWeatherFetch = () => {
		this.setState(
			state => {
				return {
					loading: !state.loading
				};
			},
			() => {
				fetch(
					`http://api.openweathermap.org/data/2.5/weather?lat=${
						this.state.lat
					}&lon=${this.state.lon}&APPID=${config.API_KEY}`
				).then(res => {
					res.json().then(data => {
						console.log(data);
						const newType = data.weather[0].main;
						const newTemp = Math.floor(data.main.temp - 273.15);
						const newLoading = false;
						const newState = {
							...this.state,
							type: newType,
							temp: newTemp,
							loading: newLoading
						};
						this.setState(newState, () => {
							console.log(this.state);
						});
					});
				});
			}
		);
	};
	handleWeatherSearch = () => {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${
				this.state.placeName
			}&APPID=${config.API_KEY}`
		).then(res => {
			res.json().then(data => {
				console.log(data);
				const newType = data.weather[0].main;
				const newTemp = Math.floor(data.main.temp - 273.15);
				const newState = {
					...this.state,
					type: newType,
					temp: newTemp
				};
				this.setState(newState, () => {
					console.log(this.state);
				});
			});
		});
	};
	setPosition = position => {
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
		const newState = {
			...this.state,
			lat: position.coords.latitude,
			lon: position.coords.longitude
		};
		this.setState(newState);
	};
	getLocation = () => {
		navigator.geolocation.getCurrentPosition(this.setPosition);
	};
	handlePlaceName = e => {
		const newState = {
			...this.state,
			placeName: e.target.value
		};
		this.setState(newState);
	};
	render() {
		let weatherInfo = null;
		if (!this.state.loading) {
			weatherInfo = <WeatherInfo />;
		} else {
			weatherInfo = <Spinner />;
		}
		return (
			<Wrapper>
				<SearchBarWrapper>
					<Searchbar
						placeName={this.state.placeName}
						changed={this.handlePlaceName}
					/>
					<Button clicked={this.handleWeatherSearch}>Search</Button>
				</SearchBarWrapper>
				OR
				<Button clicked={this.handleCurrentWeatherFetch} search>
					Get Current Weather
				</Button>
				{weatherInfo}
			</Wrapper>
		);
	}
}

export default App;
