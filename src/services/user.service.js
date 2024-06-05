import AxiosClient from '@common/providers/AxiosClient';
const PATH = '/user';
const userService = {
	login(username, password) {
		return AxiosClient.post(`${PATH}/login`, { username, password });
	},
	getMe() {
		return AxiosClient.get(`${PATH}/me`);
	},
	register(data) {
		return AxiosClient.post(`${PATH}/register`, data);
	},
	getListUser(page, limit, query, role) {
		return AxiosClient.get(`${PATH}/`, {
			params: {
				page: page,
				limit: limit,
				query: query,
				role: role,
			},
		});
	},
	getUserById(id) {
		return AxiosClient.get(`${PATH}/${id}`);
	},
	updateUser(id, data) {
		return AxiosClient.put(`${PATH}/${id}`, data);
	},
	deleteUser(id) {
		return AxiosClient.delete(`${PATH}/${id}`);
	},
	updateStatusUser(id, status) {
		return AxiosClient.put(`${PATH}/status/${id}`, { status });
	},
	uploadAvatar(file) {
		var data = new FormData();
		data.append('avatar', file);
		return AxiosClient.post(`${PATH}/avatar`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};

export default userService;
