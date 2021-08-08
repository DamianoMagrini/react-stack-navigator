import React from 'react';
import { StackNavigator } from 'react-stack-navigator';
import { ScreenA } from './screens/ScreenA';

export const App: React.FC = () => {
	return <StackNavigator root={<ScreenA />} />;
};
