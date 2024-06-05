import { getAccessToken } from '../utils/locaStore.util';
import axios from 'axios';
import { stringify } from 'qs';
const AxiosClient = axios.create({
	baseURL: process.env.REACT_APP_HOST_API,
	responseType: 'json',
	timeout: 50000,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
});

AxiosClient.interceptors.request.use(
	async (config) => {
		const newConfig = config;
		if (getAccessToken()) {
			newConfig.headers.Authorization = `Bearer ${getAccessToken()}`;
		}
		// remove empty params
		if (newConfig.params) {
			Object.keys(newConfig.params).forEach((e) => {
				if (newConfig.params[e] === '' || newConfig.params[e] === null) {
					delete newConfig.params[e];
				}
			});
		}
		return newConfig;
	},
	(error) => {
		return Promise.reject(error);
	},
);

AxiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error.response.data);
	},
);

export default AxiosClient;
