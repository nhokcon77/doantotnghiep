import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth/auth.slice';
import UserReducer from './users/users.slice';
import ProductReducer from './products/products.slice';
import OrderReducer from './orders/orders.slice';
import SettingReducer from './setting/setting.slice';
import StatisticalReducer from './statistical/statistical.slice';
import NotiReducer from './noti/noti.slice';
const store = configureStore({
	reducer: {
		auth: AuthReducer,
		users: UserReducer,
		products: ProductReducer,
		orders: OrderReducer,
		setting: SettingReducer,
		statistics: StatisticalReducer,
		noti : NotiReducer,
	},
});

export default store;
