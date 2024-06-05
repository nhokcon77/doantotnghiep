import { Routes, Route } from 'react-router-dom';
import UserManager from '@pages/home/userManager/userManager';
import ProductManager from '@pages/home/productManager/productManager';
import Login from '../pages/login/login';
import { OrderManager } from '@pages/home/orderManager/orderManager';
import { ShipManager } from '@pages/home/shipManager/shipManager';
import Setting from '@pages/setting/setting';
import StatisticalPage from '@pages/statistical/index';
import Statics from '@pages/statics/index';
const ProtectedRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/user" element={<UserManager />} />
			<Route path="/warehouse" element={<ProductManager />} />
			<Route path="/order" element={<OrderManager />} />
			<Route path="/ship" element={<ShipManager />} />
			<Route path="/setting" element={<Setting />} />
			<Route path="/statistics" element={<StatisticalPage />} />
			<Route path="/baocaothongke" element={<Statics />} />
		</Routes>
	);
};
export default ProtectedRouter;
