# React Stack Navigator

[![npm package][npm-badge]][npm] ![build status][build-badge]

[npm]: https://www.npmjs.com/package/react-stack-navigator
[npm-badge]: https://badgen.net/npm/v/react-stack-navigator
[build-badge]: https://app.buddy.works/damianomagrini/react-stack-navigator/pipelines/pipeline/341819/badge.svg?token=e5daa5d3e303ec3297c953e5ba15c55dfd4e9b4d446a68a5572422a54db02fb1

A stack navigator for React inspired by Flutter's `Navigator` API and entirely based on pushing and popping.


## Installation

With npm,

```bash
npm i react-stack-navigator
```

With Yarn,

```bash
yarn add react-stack-navigator
```

TypeScript types are included out of the box! 📦


## Usage

Using the library is quite simple: just include a `<StackNavigator>` component, specifying the `root` route (i.e., the route at the bottom of the stack).

```jsx
import { StackNavigator } from 'react-stack-navigator';

export const App = () => {
	return <StackNavigator root={<HomePage />} />;
};
```

Then, inside your components, you can `push` and `pop` routes using the functions provided by `RoutingFunctionsContext`.

```jsx
import { useStackNavigator } from 'react-stack-navigator';

export const ScreenA = () => {
	const { push } = useStackNavigator();

	return <button onClick={() => push(<ScreenB />)}>Push!</button>;
};
```

This is very similar to Flutter's `Navigator`: indeed, when you `pop` a route, you can pass in a result, which will be returned asynchronously by the last `push` function.

```jsx
import { useStackNavigator } from 'react-stack-navigator';

export const ScreenA = () => {
	const { push } = useStackNavigator();

	return (
		<button onClick={async () => {
			const result = await push(<ScreenB />)
			console.log('Hello, ' + result); // Hello, World!
		}}>Push!</button>
	);
};

export const ScreenB: React.FC = () => {
	const { pop } = useStackNavigator();

	return <button onClick={() => pop('World!')}>Pop!</button>;
};
```

### Passing in options

By passing a second argument to the `push` function, you can mark a route as modal or give it a title. Both these options are available to the child route.

```jsx
import { useStackNavigator } from 'react-stack-navigator';

export const ScreenA = () => {
	const { push } = useStackNavigator();

	return (
		<button onClick={() => push(<ScreenB />, {
			isModal: true,
			title: 'Screen B',
		})}>Push!</button>
	);
};

export const ScreenB: React.FC = () => {
	// The given options are accessible to the child route
	const { pop, isModal, routeTitle } = useStackNavigator();

	return <button onClick={() => pop()}>Pop!</button>;
};
```

### With React Router

Since navigating the stack does not alter the URL, you can include as many stack navigators as you want in your React Router routes, without changing a single line of code.


## Thanks

Big thanks to [Flutter](https://flutter.dev/) for the inspiration!
