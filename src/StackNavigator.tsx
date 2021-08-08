import React, { ReactChild } from 'react';
import { RoutingFunctionsContext } from './RoutingFunctionsContext';
import { StackRoute } from './StackRoute';

interface StackEntry {
	child: ReactChild;
	resolve: (result: any) => void;
}

export interface StackNavigatorProps {
	/**
	 * The route at the bottom of the stack
	 */
	root: ReactChild;
}

interface StackNavigatorState {
	stack: StackEntry[];
}

export class StackNavigator extends React.Component<StackNavigatorProps, StackNavigatorState> {
	state: StackNavigatorState = { stack: [] };
	private lastHistoryIndex = window.history.state?.idx ?? 0;
	private lastPopWasProgrammatic = false;

	componentDidMount() {
		window.addEventListener('popstate', this.onPopState);
	}
	componentWillUnmount() {
		return () => window.removeEventListener('popstate', this.onPopState);
	}

	private onPopState = (ev: PopStateEvent) => {
		if (this.lastPopWasProgrammatic) {
			this.lastPopWasProgrammatic = false;
			return;
		}
		const { stack } = this.state;
		const historyIndex: number = ev.state?.idx ?? 0;
		if (historyIndex < this.lastHistoryIndex && stack.length > 0) this.popRoute(null);
		this.lastHistoryIndex = historyIndex;
	};

	private pushRoute = (route: StackEntry) => {
		this.setState(({ stack }) => ({ stack: [...stack, route] }));
	};
	private popRoute = (result?: any) => {
		const { stack } = this.state;
		const currentRoute = stack[stack.length - 1];
		this.setState(({ stack: _stack }) => {
			currentRoute.resolve(result);
			return { stack: _stack.slice(0, _stack.length - 1) };
		});
	};

	private push = (child: ReactChild) => {
		window.history.pushState(null, '', window.location.pathname);
		this.lastHistoryIndex++;
		return new Promise<any>((resolve) => this.pushRoute({ child, resolve }));
	};
	private pop = (result?: any) => {
		this.lastPopWasProgrammatic = true;
		window.history.back();
		this.popRoute(result);
	};

	render() {
		return (
			<RoutingFunctionsContext.Provider value={{ push: this.push, pop: this.pop }}>
				{this.props.root}
				{this.state.stack.map((route, i) => (
					<StackRoute key={`stack-route-${i}`} index={i + 1000}>
						{route.child}
					</StackRoute>
				))}
			</RoutingFunctionsContext.Provider>
		);
	}
}
