import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	border: none;
	padding: 1em;
	border-radius: 3px;
	cursor: pointer;
	font-weight: bold;
	font-size: 0.8em;
	background-color: ${props => (props.search ? '#1982C4' : '#ffca3a')};
	color: ${props => (props.search ? '#ffffff' : '#0f0f0f')};
	:hover {
		opacity: 0.8;
	}
`;

export default function Button(props) {
	return (
		<StyledButton onClick={props.clicked} {...props}>
			{props.children}
		</StyledButton>
	);
}
