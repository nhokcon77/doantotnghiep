import AxiosClient from '@common/providers/AxiosClient';
const PATH = '/report_new';
const reportService = {
	reportOrder({ dayStart, dayEnd }) {
		return AxiosClient.get(
			`${PATH}/reportOrder`,
			{
				params: {
					dayStart,
					dayEnd,
				},
			},
		);
	},
	reportProduct({ dayStart, dayEnd }) {
		return AxiosClient.get(
			`${PATH}/reportProduct`,
			{
				params: {
					dayStart,
					dayEnd,
				},
			},
		);
	},
	
};
export default reportService;
