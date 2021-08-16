import { createContext, ReactChild } from 'react';

export interface StackNavigatorContextData {
	/**
	 * Push a route to the stack and returns its result (if any)
	 * @param child The route's element
	 */
	push(child: ReactChild, isModal?: boolean): Promise<any>;
	/**
	 * Pop the route at the top of the stack, optionally returning a result
	 * @param result The route's result (if any)
	 */
	pop(result?: any): void;
	/**
	 * Whether the route can reasonably call the `pop` function (i.e., if it's not at the bottom of
	 * the stack)
	 */
	canPop: boolean;
	/**
	 * Whether the route is modal
	 */
	isModal: boolean;
}

export const StackNavigatorContext = createContext<StackNavigatorContextData>({
	push: async () => {},
	pop: () => {},
	canPop: false,
	isModal: false,
});
