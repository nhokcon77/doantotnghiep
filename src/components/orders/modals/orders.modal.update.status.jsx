import { Modal,Form,Select } from "antd"
import { useSelector,useDispatch } from "react-redux"
import { selectSelectOrder } from "@redux/orders/orders.slice"
import { useEffect } from "react"
import {updateStatusOrder} from '../../../redux/orders/orders.thunk';
export function OrderUpdateStatusModal({ title, visible, onCancel,okText="Ok",cancelText="Hủy" })
{
	const order = useSelector(selectSelectOrder);
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	useEffect(() => {
		if (order)
		{
			form.setFieldsValue({ status: order.status })
		}
	}, [order])

	const onFinish = (values) => {
		form.validateFields().then((values) => {
			dispatch(updateStatusOrder({id:order.id,...values}));
			onCancel();
		})
	}
  
	
	return (
		<Modal title={title} open={visible} onCancel={onCancel} onOk={onFinish} okText={okText} cancelText={cancelText} width={800} >
			<Form form={form} >
				<Form.Item label={"Trạng thái đơn hàng"} name={"status"} rules={[{required:true,message:"Vui lòng chọn trạng thái đơn hàng"}]}>
					<Select>
						<Select.Option value="NOT_CREATED">Chưa tạo đơn</Select.Option>
						<Select.Option value="PENDING">Chờ lấy hàng</Select.Option>
						<Select.Option value="CONFIRMED">Đã lấy hàng</Select.Option>
						<Select.Option value="DELIVERING">Đang giao hàng</Select.Option>
						<Select.Option value="DELIVERED">Đã giao hàng</Select.Option>
						<Select.Option value="CANCELED">Đã hủy</Select.Option>
						<Select.Option value="RETURN">Đang trả hàng</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	)
}