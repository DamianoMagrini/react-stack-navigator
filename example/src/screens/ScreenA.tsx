import React, { useContext, useState } from 'react';
import { RoutingFunctionsContext } from 'react-stack-navigator';
import { ScreenB } from './ScreenB';

export const ScreenA: React.FC = () => {
	const { push } = useContext(RoutingFunctionsContext)!;
	const [result, setResult] = useState<any>(null);

	return (
		<main className='screen-container'>
			<h1>Screen A</h1>
			<button
				onClick={async () => {
					const _result = await push(<ScreenB />);
					setResult(_result);
				}}>
				Push!
			</button>
			<p>Last result: {result}</p>
		</main>
	);
};
