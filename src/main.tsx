// import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';
import { App } from '@/components';
import './index.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);

root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
