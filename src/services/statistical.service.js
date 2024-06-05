import AxiosClient from '@common/providers/AxiosClient';
const PATH = '/FbCampaigns';

const statisticalService = {
	getData: (params) => {
		return AxiosClient.get(`${PATH}/ReportByMonth`, { params });
	},
	update: (id, data) => {
		return AxiosClient.put(`${PATH}/UpdateReport/${id}`, data);
	},
};

export default statisticalService;
