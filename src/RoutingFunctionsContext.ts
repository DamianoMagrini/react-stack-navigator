import { createContext, ReactChild } from 'react';

export interface RoutingFunctions {
	/**
	 * Push a route to the stack and returns its result (if any)
	 * @param path The route's absolute path
	 * @param child The route's corresponding child element
	 */
	push(path: string, child: ReactChild): Promise<any>;
	/**
	 * Pop the route at the top of the stack, optionally returning a result
	 * @param result The route's result (if any)
	 */
	pop(result?: any): void;
}

export const RoutingFunctionsContext = createContext<RoutingFunctions>({
	push: async () => {},
	pop: () => {},
});
