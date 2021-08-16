import React from 'react';
import { useStackNavigator } from 'react-stack-navigator';

export const ScreenB: React.FC = () => {
	const { push, pop, isModal } = useStackNavigator();

	return (
		<main className='screen-container'>
			<h1>Screen B</h1>
			<button onClick={() => pop(Math.random())}>Pop! {isModal && ' (Modal!!)'}</button>
			<button onClick={async () => push(<ScreenB />)}>Push!</button>
		</main>
	);
};
