import { Table } from "antd";
import { coverNumber } from "@common/utils/method.util";
export default function Chart3(props) 
{
	const data = props?.data || {};

	const getStatusAndKey = (X,key) => {
		const status = data[X] || {};
		return status[key] || 0;
	}

	const resData = (key) => {
		return {
			quantity:getStatusAndKey(key,"length"),
			orderPrice:getStatusAndKey(key,"totalPriceOrder"),
			shipPrice:getStatusAndKey(key,"shipFee"),
			importPrice:getStatusAndKey(key,"totalImportPrice"),
			profit:getStatusAndKey(key,"totalPriceOrder") - getStatusAndKey(key,"totalImportPrice") - getStatusAndKey(key,"shipFee")
		}
	}


	const defaultData = [
		{
			id:1,
			status:"Chờ tạo đơn",
			...resData("NOT_CREATED")

		},
		{
			id:1,
			status:"Chờ lấy hàng",
			...resData("PENDING")

		},
		{
			id:1,
			status:"Đã lấy hàng",
			...resData("CONFIRMED")

		},
		{
			id:1,
			status:"Đang giao hàng",
			...resData("DELIVERING")

		},
		{
			id:1,
			status:"Đã giao hàng",
			...resData("DELIVERED")

		},
		{
			id:1,
			status:"Đã hủy",
			...resData("CANCELED")

		},
		{
			id:1,
			status:"Đang hoàn hàng",
			...resData("RETURN")

		},
		{
			id:1,
			status:"Đã hoàn hàng",
			...resData("RETURNED")

		},
	]


	return <div style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",background:"#fff",borderRadius:"15px"}}>
<Table dataSource={defaultData} pagination={false}>
		<Table.Column title="Trạng thái" dataIndex={"status"}  render={coverNumber} />
		<Table.Column title="Số lượng" dataIndex={"quantity"}  render={coverNumber}/>
		<Table.Column title="Tiền đơn hàng" dataIndex={"orderPrice"}  render={coverNumber}/>
		<Table.Column title="Tiền ship" dataIndex={"shipPrice"}  render={coverNumber}/>
		<Table.Column title="Tiền nhập hàng" dataIndex={"importPrice"}   render={coverNumber}/>
		<Table.Column title="Lợi nhận" dataIndex={"profit"}  render={coverNumber} />
	</Table>
	</div>
}