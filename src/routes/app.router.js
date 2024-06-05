import { Fragment } from 'react';
import ProtectedRouter from './protected.router';

function AppRouter() {
	const Routes = ProtectedRouter;
	return (
		<Fragment>
			<Routes />
		</Fragment>
	);
}

export default AppRouter;
