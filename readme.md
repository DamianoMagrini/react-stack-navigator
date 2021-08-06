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

TypeScript typings included out of the box! 📦


## Usage

Using the library is quite simple: just include a `<StackNavigator>` component, specifying the `root` route.

```jsx
import { StackNavigator } from 'react-stack-navigator';

export const App = () => {
	return <StackNavigator root={<HomePage />} />;
};
```

You can also map paths to `routes`, so that if your app is started from a URL other than `/`, the route you specify will be loaded over the `root` route.

```jsx
import { StackNavigator } from 'react-stack-navigator';

export const App = () => {
	return <StackNavigator root={<HomePage />} routes={{ '/profile': <ProfilePage /> }} />;
};
```

Then, inside your components, you can `push` and `pop` routes using the functions provided by `RoutingFunctionsContext`.

```jsx
import { RoutingFunctionsContext } from 'react-stack-navigator';

export const ScreenA = () => {
	const { push } = useContext(RoutingFunctionsContext);

	return <button onClick={() => push('/b', <ScreenB />)}>Push!</button>;
};
```

This is very similar to Flutter's `Navigator`: indeed, when you `pop` a route, you can pass in a result, which will be returned asynchronously by the last `push` function.

```jsx
import { RoutingFunctionsContext } from 'react-stack-navigator';

export const ScreenA = () => {
	const { push } = useContext(RoutingFunctionsContext);

	return (
		<button onClick={async () => {
			const result = await push('/b', <ScreenB />)
			console.log('Hello, ' + result); // Hello, World!
		}}>Push!</button>
	);
};

export const ScreenB: React.FC = () => {
	const { pop } = useContext(RoutingFunctionsContext);

	return <button onClick={() => pop('World!')}>Pop!</button>;
};
```


## Thanks

Big thanks to [Flutter](https://flutter.dev/) for the inspiration! And thanks to [React Training](https://reacttraining.com/) for their awesome [`history`](https://github.com/ReactTraining/history/) module.
