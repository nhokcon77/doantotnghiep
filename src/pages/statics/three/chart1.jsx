import React from 'react';
import { Row, Col } from 'antd';
import { coverPrice } from "@common/utils/method.util"
export default function Chart1(props) {
	const data = props?.data || {};
	
	const total = ()=>{
		let total = 0;
		let orderPrice = 0;
		let shipPrice = 0;
		Object.keys(data).forEach(key => {
			total += data[key].length || 0;
			orderPrice += data[key].totalPriceOrder || 0;
			shipPrice += data[key].shipFee || 0;
		})
		return [total,orderPrice,shipPrice];
	}



	return (
		<div>
			<Row gutter={[15,15]}>
				<Col span={8}>
					<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"start",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding:"15px"
					}}>
						<h2>
							Số lượng đơn hàng
						</h2>
						<h1>
							{coverPrice().toVND(total()[0])}
						</h1>
					</div>
				</Col>
				<Col span={8}>
				<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"start",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding:"15px"
					}}>
						<h2>
							Tổng số tiền thu hộ
						</h2>
						<h1>
						{coverPrice().toVND(total()[1])}đ
						</h1>
					</div>
				</Col>
				<Col span={8}>
				<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"start",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding:"15px"
					}}>
						<h2>
							Tổng tiền cước
						</h2>
						<h1>
						{coverPrice().toVND(total()[2])}đ
						</h1>
					</div>
				</Col>
				
			</Row>
		</div>
	);
}