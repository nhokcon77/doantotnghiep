import AxiosClient from '@common/providers/AxiosClient';

const PATH = '/ghtk';
const ghtkService = {
	shippingFee(data) {
		return AxiosClient.post(`${PATH}/shipping`, data);
	},
	printOrder(id) {
		return AxiosClient.get(`${PATH}/print/${id}`, {
			responseType: 'blob',
		});
	},
	printOrders(ids) {
		return AxiosClient.post(
			`${PATH}/print/printPdfMerge`,
			{
				ids,
			},
			{
				responseType: 'blob',
			},
		);
	},
	cancelOrder(id) {
		return AxiosClient.delete(`${PATH}/cancel/${id}`);
	},
};
export default ghtkService;
