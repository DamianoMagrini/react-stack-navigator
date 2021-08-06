import React from 'react';
import { StackNavigator } from 'react-stack-navigator';
import { ScreenA } from './screens/ScreenA';
import { ScreenB } from './screens/ScreenB';

export const App: React.FC = () => {
	return <StackNavigator root={<ScreenA />} routes={{ '/b': <ScreenB /> }} />;
};
