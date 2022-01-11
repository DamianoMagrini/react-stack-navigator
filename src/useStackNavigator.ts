import { useContext } from 'react';
import { StackNavigatorContext, StackNavigatorContextData } from './StackNavigatorContext.js';

export const useStackNavigator = (): StackNavigatorContextData => {
	return useContext(StackNavigatorContext);
};
