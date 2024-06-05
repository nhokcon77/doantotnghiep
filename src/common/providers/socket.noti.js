import { io } from 'socket.io-client';
import { getAccessToken } from '@common/utils/locaStore.util';
import { setUnread, setNotis,setNotisOld,pushNotification } from '@redux/noti/noti.slice';
import store from '@redux/store';
const socketNoti = io(process.env.REACT_APP_HOST_API + '/notification', {
	transports: ['websocket'],
	autoConnect: false,
	auth: (cb) => {
		cb({
			Authorization: 'Bearer ' + getAccessToken(),
		});
	},
});

socketNoti.on('Notification', (data) => {
	console.log('Notification', data);
	store.dispatch(setUnread(data.totalUnReads));
	store.dispatch(setNotis(data.noti));
});
socketNoti.on('Notification_old', (data) => {
	store.dispatch(setNotisOld(data.noti));
});
socketNoti.on('noti', (data) => {
	console.log('noti', data);
	store.dispatch(pushNotification(data));
});
socketNoti.on('connect', () => {
	console.log('connect');
});
socketNoti.on('disconnect', () => {
	console.log('disconnect');
});
export default socketNoti;
