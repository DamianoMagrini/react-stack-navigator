import React, { ReactChild } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../src/styles.css';
import { StackNavigatorContext } from './StackNavigatorContext';

interface StackEntry {
	child: ReactChild;
	resolve: (result: any) => void;
	isModal: boolean;
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
	private lastHistoryIndex = 0;
	private lastPopWasProgrammatic = false;

	componentDidMount() {
		window.addEventListener('popstate', this.onPopState);
	}
	componentWillUnmount() {
		window.removeEventListener('popstate', this.onPopState);
	}

	private onPopState = (ev: PopStateEvent) => {
		if (this.lastPopWasProgrammatic) {
			this.lastPopWasProgrammatic = false;
			return;
		}
		const { stack } = this.state;
		const historyIndex: number = Number(window.location.hash.slice(1));
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

	private push = (child: ReactChild, isModal: boolean = false) => {
		this.lastPopWasProgrammatic = true;
		this.lastHistoryIndex++;
		window.location.hash = this.lastHistoryIndex.toString();
		return new Promise<any>((resolve) => this.pushRoute({ child, resolve, isModal }));
	};
	private pop = (result?: any) => {
		this.lastPopWasProgrammatic = true;
		window.history.back();
		this.popRoute(result);
	};

	render() {
		return (
			<>
				<StackNavigatorContext.Provider
					value={{
						push: this.push,
						pop: this.pop,
						canPop: false,
						isModal: false,
					}}>
					{this.props.root}
				</StackNavigatorContext.Provider>

				{createPortal(
					<TransitionGroup>
						{this.state.stack.map((route, i) => (
							<CSSTransition
								key={`stack-route-${i}`}
								timeout={150}
								classNames={route.isModal ? 'rsn-modal-route' : 'rsn-route'}>
								<StackNavigatorContext.Provider
									value={{
										push: this.push,
										pop: this.pop,
										canPop: true,
										isModal: route.isModal,
									}}>
									<div className='rsn-route' style={{ zIndex: i + 1000 }}>
										{route.child}
									</div>
								</StackNavigatorContext.Provider>
							</CSSTransition>
						))}
					</TransitionGroup>,
					document.body,
				)}
			</>
		);
	}
}
