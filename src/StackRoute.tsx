import React from 'react';
import { createPortal } from 'react-dom';

export interface StackRouteProps {
	index: number;
}

export const StackRoute: React.FC<StackRouteProps> = ({ index, children }) => {
	return createPortal(
		<div
			style={{
				position: 'fixed',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: index,
				overflow: 'auto',
			}}>
			{children}
		</div>,
		document.body,
	);
};
