import React from 'react';

export default function WeatherInfo(props) {
	let icon = null;
	if (props.icon !== null) {
		icon = (
			<img
				src={`http://openweathermap.org/img/w/${props.icon}.png`}
				alt="weather icon"
			/>
		);
	}
	return (
		<div>
			{icon}
			<h1>{props.temp}</h1>
			<h3>{props.place}</h3>
			<h3>{props.type}</h3>
		</div>
	);
}
