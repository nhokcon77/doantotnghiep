import React from 'react';
import { Row, Col } from 'antd';
import { coverPrice } from '@common/utils/method.util';

export default function Chart1(props) {

	const data =  props?.data || {};

	const total = ()=>{
		let total = 0;
		let orderPrice = 0;
		let shipPrice = 0;
		let quantity = 0;
		Object.keys(data).forEach(key => {
			total += data[key].length || 0;
			orderPrice += data[key].totalPriceOrder || 0;
			shipPrice += data[key].shipFee || 0;
			quantity += data[key].quantity || 0;
		})
		return [total,orderPrice,shipPrice,quantity];
	}

	const totalByKey = (key)=>{
		let total = 0;
		let orderPrice = 0;
		let shipPrice = 0;
		let quantity = 0;
		total += data[key]?.length || 0;
			orderPrice += data[key]?.totalPriceOrder || 0;
			shipPrice += data[key]?.shipFee || 0;
			quantity += data[key]?.quantity || 0;
		return [total,orderPrice,shipPrice,quantity];
	}

	return (
		<div>
			<Row gutter={[15,15]}>
				<Col span={6}>
					<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"flex-start",
					display:"flex",alignItems:"start",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding:"15px"
					}}>
						<h4>
							Tổng sản phẩm đã xác nhận
						</h4>
						<Row style={{width:"100%"}}>
							<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Tổng tiền</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(total()[1])} đ</h2>
								</div>
								</Col>
								<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Số lượng</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(total()[3])}</h2>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col span={6}>
					<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"flex-start",
					display:"flex",alignItems:"start",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding:"15px"
					}}>
						<h4>
							Tổng sản phẩm hoàn
						</h4>
						<Row style={{width:"100%"}}>
							<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Tổng tiền</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(totalByKey("RETURN")[1] + totalByKey("RETURNED")[1])} đ</h2>
								</div>
								</Col>
								<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Số lượng</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(totalByKey("RETURN")[3] + totalByKey("RETURNED")[3])}</h2>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col span={6}>
					<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"flex-start",
					display:"flex",alignItems:"start",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding:"15px"
					}}>
						<h4>
							Tổng giao thành công
						</h4>
						<Row style={{width:"100%"}}>
							<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Tổng tiền</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(totalByKey("DELIVERED")[1])} đ</h2>
								</div>
								</Col>
								<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Số lượng</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(totalByKey("DELIVERED")[0])}</h2>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col span={6}>
					<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"flex-start",
					display:"flex",alignItems:"start",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding:"15px"
					}}>
						<h4>
							Tổng tiền cước
						</h4>
						<Row style={{width:"100%"}}>
							<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Tổng tiền</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(total()[2])} đ</h2>
								</div>
								</Col>
								<Col span={12} style={{marginTop:"20px",textAlign:"left"}}>
								<div>
									<h3>Số lượng</h3>
								</div>
								<div >
									<h2 style={{color:"green"}}>{coverPrice().toVND(total()[0])}</h2>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	);
}