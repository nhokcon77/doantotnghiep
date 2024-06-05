import React from 'react';
import ReactDOM from 'react-dom/client';
import './common/styles/index.css';
import App from './App';
import '@fontsource/roboto';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<ConfigProvider locale={viVN}>
			<App />
		</ConfigProvider>
	</React.StrictMode>,
);
