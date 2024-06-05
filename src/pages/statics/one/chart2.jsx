import { Select, Table } from "antd";
import { coverNumber } from "@common/utils/method.util";
import { useState } from "react";
export default function Chart2(props) 
{
	const [optionSort, setOptionSort] = useState("0");
	const data = Array.from(props?.data || []).sort((a,b)=>{
		if(optionSort === "0"){
			return b.totalProductSold - a.totalProductSold;
		}
		return b.totalOrderReturn - a.totalOrderReturn;
	});
	
	// {
	// 	id:1,
	// 	status:"Sextoy dành cho bé",
	// 	profit:400000,	
	// 	quantity:100,
	// 	quantityConfirm:100,
	// 	quantityOrderConfirm:100,
	// 	quantityProductReturn:100,
	// 	shipPrice:100000,
	// },


	// {
    //     "id": "6539717490b98fbeb23a6e1b",
    //     "name": "KỆ TREO MÁY SẤY KIÊM ĐỂ LƯỢC",
    //     "totalProductInStock": 10,
    //     "totalProductSold": 0,
    //     "totalOrderComfirm": 0,
    //     "totalOrderReturn": 0,
    //     "totalShipFee": 0,
    //     "totalImportPrice": 0
    // },

	const defaultData = [
		
	]

	console.log(data)


	return <div>
		<Select style={{width:"200px"}} defaultValue={optionSort} onChange={e=> setOptionSort(e)}>
			<Select.Option value="0">Bán nhiều nhất</Select.Option>
			<Select.Option value="1">Hoàn nhiều nhất</Select.Option>
		</Select>
		<Table dataSource={ data} pagination={{
			defaultPageSize:5,
			showSizeChanger:true
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
	</div>
}