import React, { useContext } from 'react';
import { RoutingFunctionsContext } from 'react-stack-navigator';

export const ScreenB: React.FC = () => {
	const { pop } = useContext(RoutingFunctionsContext);

	return (
		<main className='screen-container'>
			<h1>Screen B</h1>
			<button onClick={() => pop(Math.random())}>Pop!</button>
		</main>
	);
};
