import { Select, Table } from "antd";
import { coverNumber } from "@common/utils/method.util";
import { Radio } from "antd";
import Modal from "antd/es/modal/Modal";
export default function Modal3(props) 
{
	const data = props?.data || [];
	return <div>
		<Modal title="Chi tiết" open={props.open || false} onCancel={props.onCancel} footer={null}>
		<Select style={{width:"200px"}} defaultValue={"x"}>
			<Select.Option value="x">Bán nhiều nhất</Select.Option>
			<Select.Option value="1">Hoàn nhiều nhất</Select.Option>
		</Select>
		<Table dataSource={ data} pagination={{
			pageSize:10,
			showSizeChanger:false
		}}>
		<Table.Column title="Thông tin sản phẩm" dataIndex={"name"}/>
		<Table.Column title="Doanh thu" dataIndex={"profit"}  render={coverNumber}/>
		<Table.Column title="SL hàng" dataIndex={"totalProductInStock"}  render={coverNumber}/>
		<Table.Column title="SL hàng chốt" dataIndex={"totalProductSold"}  render={coverNumber}/>
		<Table.Column title="SL đơn chốt" dataIndex={"totalOrderComfirm"}   render={coverNumber}/>
		<Table.Column title="SL sản phẩm hoàn" dataIndex={"totalOrderReturn"}   render={coverNumber}/>
		<Table.Column title="Tiền cước" dataIndex={"totalShipFee"}   render={coverNumber}/>
		<Table.Column title="Lợi nhuận" dataIndex={"profit"}   render={coverNumber}/>
	</Table>
	</Modal>
	</div>
}