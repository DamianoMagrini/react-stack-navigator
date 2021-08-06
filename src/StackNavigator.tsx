import React, { ComponentType, ReactChild, useState } from 'react';
import { history } from './history';
import { RoutingFunctionsContext } from './RoutingFunctionsContext';
import { StackRoute } from './StackRoute';

interface StackEntry {
	child: ReactChild;
	resolve: (result: any) => void;
	path: string;
	isInitial: boolean;
}

export interface StackNavigatorProps {
	/**
	 * The root route (usually the home page or such).
	 */
	root: ReactChild;
	/**
	 * An object mapping URL paths to routes.
	 */
	routes?: Record<string, ComponentType>;
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({ root, routes }) => {
	const [stack, updateStack] = useState<StackEntry[]>([
		{
			child: root,
			resolve: () => {},
			path: '/',
			isInitial: true,
		},
		// TODO support dynamic initial pathnames, e.g. /users/:userId
		...(history.location.pathname in (routes ?? {})
			? [
					{
						child: React.createElement(routes![history.location.pathname]),
						resolve: () => {},
						path: history.location.pathname,
						isInitial: true,
					},
			  ]
			: []),
	]);

	const pushRoute = (route: StackEntry) => {
		updateStack((_routes) => [..._routes, route]);
	};

	const pop = (result: any) => {
		const currentRoute = stack[stack.length - 1];
		if (currentRoute.isInitial) history.replace('/');
		else history.back();
		updateStack((_stack) => {
			history.replace(stack[stack.length - 2].path);
			currentRoute.resolve(result);
			return _stack.slice(0, _stack.length - 1);
		});
	};
	const push = (path: string, child: ReactChild) => {
		history.push(path);
		return new Promise<any>((resolve) => pushRoute({ child, resolve, path, isInitial: false }));
	};

	return (
		<RoutingFunctionsContext.Provider value={{ push, pop }}>
			{stack.map((route, i) => (
				<StackRoute key={`stack-route-${i}`} index={i + 1000}>
					{route.child}
				</StackRoute>
			))}
		</RoutingFunctionsContext.Provider>
	);
};
