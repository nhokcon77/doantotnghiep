import { io } from 'socket.io-client';
import { getAccessToken } from '@common/utils/locaStore.util';
import store from '@redux/store';
import { setData, setAccounts } from '@redux/statistical/statistical.slice';
const socket = io(process.env.REACT_APP_HOST_API + '/campaigns', {
	transports: ['websocket'],
	autoConnect: false,
	auth: (cb) => {
		cb({
			Authorization: 'Bearer ' + getAccessToken(),
		});
	},
});

socket.on('connect', () => {
	socket.emit('getAccounts');
});

socket.on('campaigns', (data) => {
	store.dispatch(setData(data));
});

socket.on('accounts', (data) => {
	store.dispatch(setAccounts(data));
});

export default socket;
