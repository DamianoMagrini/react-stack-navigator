/// <reference path="./static.d.ts" />

import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import './global.css';

render(<App />, document.getElementById('app-root'));
