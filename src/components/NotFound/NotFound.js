import React from 'react';
import notFound from './notfound.png';
import styled from 'styled-components';
const Image = styled.img`
	width: 25%;
`;

export default function NotFound() {
	return (
		<div>
			<p>
				<Image src={notFound} alt="not found" />
			</p>
		</div>
	);
}
