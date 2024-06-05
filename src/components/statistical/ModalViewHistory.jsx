import { historysSelector } from '@redux/statistical/statistical.slice';
import { useSelector } from 'react-redux';
import { Modal,Table } from 'antd';
import {toVnd, toVnd2,coverNumber} from '@common/utils/method.util';
export function ModalViewHistory(props)
{
	const { show,onClose } = props;

	const historys = useSelector(historysSelector);

	return (
		<div>
			<Modal width={1500} open={show} onOk={onClose} onCancel={onClose} title="Xem thông tin chi tiết chiến dịch">
				<Table dataSource={historys} >
					<Table.Column width={400} title="Tên chiến dịch" dataIndex="campaign_name" key="campaign_name" />
					<Table.Column title="Ngân sách" dataIndex="daily_budget" key="daily_budget" align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="Số tiền chi tiêu" dataIndex="spend" key="spend"  align="center"  render={(e) => coverNumber(e)}  />
					<Table.Column title="Lượt hiển thị" dataIndex="impressions" key="impressions"  align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="CPM" dataIndex="cpm" key="cpm"  align="center" render={(e) => toVnd2(e)}  />
					<Table.Column title="Tiếp cận" dataIndex="reach" key="reach"  align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="Kết quả" dataIndex="complete_registration" key="complete_registration"  align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="CTR kết quả" dataIndex="ctr" key="ctr"  align="center" render={(e) => toVnd(e)+"%" } />
					<Table.Column title="Chi phí trên mỗi kết quả" key="cpl" dataIndex="cpl"  align="center"  render={(e) => coverNumber(e)}/>
				</Table>
			</Modal>
		</div>
	)
}