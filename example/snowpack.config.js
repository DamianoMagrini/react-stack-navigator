/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/dist' },
	},
	plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-typescript'],
	routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
	optimize: {
		// "bundle": true,
	},
	packageOptions: {},
	devOptions: {},
	buildOptions: {},
};
