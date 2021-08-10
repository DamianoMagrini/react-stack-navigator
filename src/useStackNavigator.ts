import { useContext } from 'react';
import { StackNavigatorContext, StackNavigatorContextData } from './StackNavigatorContext';

export const useStackNavigator = (): StackNavigatorContextData => {
	return useContext(StackNavigatorContext);
};
