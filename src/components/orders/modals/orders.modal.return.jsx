import { Modal,Form,InputNumber,Button } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { selectSelectOrder } from "@redux/orders/orders.slice";
import { useEffect } from "react";
import { returnOrder } from "@redux/orders/orders.thunk";
export function OrderReturnModal(props)
{
	const { visible,onCancel } = props;
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const order = useSelector(selectSelectOrder);


	const handleOk = (e) => {
		const data = {...form.getFieldsValue(),id:order.id};
		dispatch(returnOrder(data));
		onCancel()
	}

	useEffect(() => {
		if(order)
		{
			const products = order.products.map((item) => {
				return {
					...item,
					quantityBroken:0
				}
			})
			form.setFieldsValue({
				products
			})
		}
	},[order])


	const buttonProps = {
		okButtonProps:{
			style:{
				display:"none"
			}
		},
		cancelButtonProps:{
			style:{
				display:"none"
			}
		}
	}

	

	return(
		<div>
			<Modal title="Xác nhận trả hàng" open={visible} onCancel={onCancel} {...buttonProps}>
				<Form form={form} layout="horizontal"  onSubmitCapture={handleOk}  >
					<Form.List name="products" >
						{(fields, { add, remove }) => (
							<div>
								{fields.map((field, index) => (
									<div>
										<div className="title fs-2 mb-1">
											{order?.products[index]?.name ?? ""} - {order?.products[index]?.option_name ?? ""}
										</div>
										<div key={field.name} className="flex flex-row between">
											<Form.Item label="Số lượng" name={[field.name, 'quantity']}>
												<InputNumber min={0} max={order?.products[index]?.quantity} />
											</Form.Item>
											<Form.Item label="Số lượng hỏng" name={[field.name, 'quantityBroken']}>
												<InputNumber min={0}  />
											</Form.Item>
										</div>
									</div>
								))}
							</div>
						)}
					</Form.List>
					
					<Form.Item className="flex w100 end">
						<Button htmlType="submit" type="primary">Lưu</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}