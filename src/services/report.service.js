import AxiosClient from '@common/providers/AxiosClient';
const PATH = '/report';
const reportService = {
	getCamp({ dayStart, dayEnd }) {
		return AxiosClient.get(
			`${PATH}/generate-report-camp`,
			{
				params: {
					dayStart,
					dayEnd,
				},
			},
			{
				responseType: 'arraybuffer',
			},
		);
	},
	getShipping({ dayStart, dayEnd }) {
		return AxiosClient.get(
			`${PATH}/generate-report-bill-of-lading`,
			{
				params: {
					dayStart,
					dayEnd,
				},
			},
			{
				responseType: 'arraybuffer',
			},
		);
	},
	getSale({ dayStart, dayEnd }) {
		return AxiosClient.get(
			`${PATH}/generate-report-telesale`,
			{
				params: {
					dayStart,
					dayEnd,
				},
			},
			{
				responseType: 'arraybuffer',
			},
		);
	},
};
export default reportService;
