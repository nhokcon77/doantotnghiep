import AxiosClient from '@common/providers/AxiosClient';
const PATH = '/product';

const productService = {
	getListProduct(page, limit, query) {
		return AxiosClient.get(`${PATH}/`, {
			params: {
				page: page,
				limit: limit,
				query: query,
			},
		});
	},
	getProductById(id) {
		return AxiosClient.get(`${PATH}/${id}`);
	},
	createProduct(data) {
		var formData = new FormData();
		formData.append('name', data.name);
		if (data.image) {
			formData.append('image', data.image);
		}
		formData.append('code', data.code);
		formData.append('options', JSON.stringify(data.options));
		return AxiosClient.post(`${PATH}/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
	updateProduct(id, data) {
		var formData = new FormData();
		formData.append('name', data.name);
		if (data.image) {
			formData.append('image', data.image);
		}
		formData.append('options', JSON.stringify(data.options));
		return AxiosClient.put(`${PATH}/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
	deleteProduct(id) {
		return AxiosClient.delete(`${PATH}/${id}`);
	},
};
export default productService;
