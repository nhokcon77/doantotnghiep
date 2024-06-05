import React from 'react';
import { Row, Col } from 'antd';

export default function Chart2(props) {

	const data = props?.data || [];

	const getByKey = (key) => {
		return data.find(item => item._id === key)?.count || 0;
	}


	return (
		<div>
			<Row gutter={[15,15]}>
				<Col span={8}>
					<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"center",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
					}}>
						<h2>
							Tổng số đơn
						</h2>
						<h1>
						{getByKey("PENDING") + getByKey("CONFIRM") + getByKey("NOT_CONTACT") + getByKey("PHONE_DESTROY") + getByKey("CANCEL")} 
						</h1>
					</div>
				</Col>
				<Col span={8}>
				<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"center",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
					}}>
						<h2>
							Chờ xác nhận
						</h2>
						<h1>
						{getByKey("PENDING")}
						</h1>
					</div>
				</Col>
				<Col span={8}>
				<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"center",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
					}}>
						<h2>
							Đã xác nhận
						</h2>
						<h1>
						{getByKey("CONFIRM")}
						</h1>
					</div>
				</Col>
				<Col span={8}>
				<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"center",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
					}}>
						<h2>
							Không gọi được
						</h2>
						<h1>
						{getByKey("NOT_CONTACT")}
						</h1>
					</div>
				</Col>
				<Col span={8}>
				<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"center",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
					}}>
						<h2>
							Đơn phá hoại
						</h2>
						<h1>
						{getByKey("PHONE_DESTROY")}
						</h1>
					</div>
				</Col>
				<Col span={8}>
				<div style={{width:"95%",height:"150px",
					margin:"0 auto",textAlign:"center",
					display:"flex",alignItems:"center",
					flexDirection:"column",justifyContent:"center",
					background:"#fff",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
					}}>
						<h2>
							Đơn hủy
						</h2>
						<h1>
							{getByKey("CANCEL")}
						</h1>
					</div>
				</Col>
			</Row>
		</div>
	);
}