import { io } from 'socket.io-client';
import { getAccessToken } from '@common/utils/locaStore.util';
import { Notification } from '@common/utils/method.util';
import { PushOrder } from '@redux/orders/orders.slice';
import store from '@redux/store';
const socket = io(process.env.REACT_APP_HOST_API, {
	transports: ['websocket'],
	autoConnect: false,
	auth: (cb) => {
		cb({
			Authorization: 'Bearer ' + getAccessToken(),
		});
	},
});

socket.on('NEW_ORDER', (data) => {
	Notification('Có đơn hàng mới').info();
	store.dispatch(PushOrder(data));
});

socket.on('connect', () => {});
socket.on('disconnect', () => {});
export default socket;
