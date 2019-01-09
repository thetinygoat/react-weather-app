import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
	padding: 1em;
	border-radius: 3px;
	border: 1px solid #1982c4;
`;

export default function Searchbar(props) {
	return (
		<div>
			<StyledInput
				type="text"
				placeholder="Placename"
				value={props.placeName}
				onChange={props.changed}
			/>
		</div>
	);
}
