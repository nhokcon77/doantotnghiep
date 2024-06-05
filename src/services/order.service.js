import AxiosClient from '@common/providers/AxiosClient';
const PATH = '/order';

const orderService = {
	getListOrder(page, limit, query, sort, type, status, fromDate, toDate) {
		return AxiosClient.get(`${PATH}/`, {
			params: {
				page: page,
				limit: limit,
				query: query,
				sort: sort,
				type: type,
				status: status,
				fromDate: fromDate,
				toDate: toDate,
			},
		});
	},
	getOrderById(id) {
		return AxiosClient.get(`${PATH}/${id}`);
	},
	createOrder(data) {
		return AxiosClient.post(`${PATH}/`, data, {
			params: {
				shippingType: data.shippingType,
			},
		});
	},
	updateOrder(id, type, data) {
		return AxiosClient.put(`${PATH}/${id}`, data, {
			params: {
				type: type,
				shippingType: data.shippingType,
			},
		});
	},
	updateTypeOrder(id, type, data) {
		return AxiosClient.put(
			`${PATH}/type/${id}`,
			{...data},
			{
				params: {
					type: type,
				},
			},
		);
	},
	updateStatusOrder(id, status) {
		return AxiosClient.put(
			`${PATH}/status/${id}`,
			{},
			{
				params: {
					status: status,
				},
			},
		);
	},
	returnOrder(id, data) {
		return AxiosClient.put(`${PATH}/return/${id}`, data);
	},
	orderShipping(id) {
		return AxiosClient.put(`${PATH}/ship/${id}`);
	},
	updateStatusByshipOrderNotCreate(id)
	{
		return AxiosClient.put(`${PATH}/updateStatusByshipOrderNotCreate/${id}`);
	}
};
export default orderService;
