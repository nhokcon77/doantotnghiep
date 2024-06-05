import AxiosClient from '@common/providers/AxiosClient';
const PATH = '/environment';

const environmentService = {
	update(data) {
		return AxiosClient.put(`${PATH}/`, data);
	},
	get() {
		return AxiosClient.get(`${PATH}/`);
	},
};

export default environmentService;
