import { Modal,Timeline } from "antd";
import { useSelector } from "react-redux";
import { selectSelectOrder } from "@redux/orders/orders.slice";
import { toDate,statusTimeLine } from '@common/utils/method.util'
export function OrderTimelineModal({ title, visible, onCancel,okText="Ok",cancelText="Hủy" })
{
	const order = useSelector(selectSelectOrder);
	
	function toStatus(item)
	{
		return <div style={{color:item.color,fontSize:"18px"}}>
			{statusTimeLine(item.status_id)}
		</div>
	}

	function toReason(item)
	{
		return <div>
			{item.reason?.length > 0 ? `- ${item.reason}` : ""}
		</div>
	}


	return (
		<Modal title={title} open={visible} onCancel={onCancel} onOk={onCancel} okText={okText} cancelText={cancelText} width={800} >
			<div id="OrderTimeLine">
				<Timeline>
					{
						order?.timelines?.map((item,index) => {
							return (<Timeline.Item key={index} color={item.color}>{toDate(item.action_time).toDateTimeDay()} - {toStatus(item)} {toReason(item)}</Timeline.Item>)
						})
					}
				</Timeline>
			</div>
		</Modal>
	)
}