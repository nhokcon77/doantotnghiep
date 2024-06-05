import store from './redux/store';
import { Provider } from 'react-redux';
import AppProvider from './common/providers/app.provider';
import AppRouter from './routes/app.router';
import Notiflix from 'notiflix';
import { useEffect } from 'react';

import '@common/lib/fontawesome';
import '@common/lib/notiflix-init';
import '@common/lib/bootstrap.scss';
function App() {
	Notiflix.Notify.init({
		position: 'right-top',
	});
	useEffect(() => {
		if (window.screen.width > 600) {
			//onlyFullHD();
		}
	}, []);
	return (
		<Provider store={store}>
			<AppProvider>
				<AppRouter />
			</AppProvider>
		</Provider>
	);
}

export default App;
