import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import * as config from './config';
import styled from 'styled-components';
import Spinner from './components/Spinner/Spinner';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import NotFound from './components/NotFound/NotFound';
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
		loading: false,
		placeValue: null,
		icon: null,
		notFound: false
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
						if (!data.weather) {
							this.setState(state => {
								return {
									notFound: !state.notFound
								};
							});
							return;
						}
						const newType = data.weather[0].main;
						const newIcon = data.weather[0].icon;
						const newTemp = Math.floor(data.main.temp - 273.15);
						const newPlaceName = data.name;
						const newFoundStatus = false;
						const newLoading = false;
						const newState = {
							...this.state,
							type: newType,
							temp: newTemp,
							loading: newLoading,
							placeValue: newPlaceName,
							icon: newIcon,
							notFound: newFoundStatus
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
				if (!data.weather) {
					this.setState(state => {
						return {
							notFound: !state.notFound
						};
					});
					return;
				}
				const newType = data.weather[0].main;
				const newTemp = Math.floor(data.main.temp - 273.15);
				const newIcon = data.weather[0].icon;
				const newPlaceValue = this.state.placeName;
				const newFoundStatus = false;
				const newState = {
					...this.state,
					type: newType,
					temp: newTemp,
					placeValue: newPlaceValue,
					icon: newIcon,
					notFound: newFoundStatus
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
		let notFound = null;
		if (this.state.notFound) {
			notFound = <NotFound />;
		}
		let weatherInfo = null;
		if (!this.state.loading) {
			weatherInfo = (
				<WeatherInfo
					temp={this.state.temp}
					place={this.state.placeValue}
					type={this.state.type}
					icon={this.state.icon}
				/>
			);
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
				{notFound}
				{weatherInfo}
			</Wrapper>
		);
	}
}

export default App;
