
import { Modal } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { selectSelectOrder } from "@redux/orders/orders.slice";
import { orderShipping } from "@redux/orders/orders.thunk";
import { MapInfo } from "@common/utils/map.util"
import { toDate } from "@common/utils/method.util";
import { Button} from "antd";
import "./modals.scss"
export function OrderViewModal({ title, visible, onCancel,okText="Ok",cancelText="Hủy" })
{
	const order = useSelector(selectSelectOrder);
	const dispatch = useDispatch();
	const handleKeyVal = (key, val) => {
		return (
			<div className="item flex">
				<span className="label min150">
					<span>{key}:</span>
				</span>
				<span className="value">
					<span>{val}</span>
				</span>
			</div>
		)
	}
	const handleProduct = (product) => {
		return (
			<div className="item">
				<span className="label">
					<span>{product.name}</span>
				</span>
				<div className="option flex flex-row between">
					<span className="value">
						<span>{product.option_name}</span>
					</span>
					<span className="value">
						<span>{product.quantity} x {product.price.toLocaleString()}đ</span>
					</span>
					<span className="value">
						<span>{(product.quantity * product.price).toLocaleString()}đ</span>
					</span>
				</div>
			</div>
		)
	}

	const handleShipping = () => {
		dispatch(orderShipping(order.id));
		onCancel();
	}



	const orderInfo = () => {
		return (
			<>
				{handleKeyVal("Mã đơn hàng", order.code)}
				{handleKeyVal("Tên khách hàng", order.name)}
				{handleKeyVal("Số điện thoại", order.phone)}
				{handleKeyVal("Địa chỉ",order.shipInfo?.address)}
				{handleKeyVal("Tỉnh/Thành phố", MapInfo.province(order.shipInfo?.province))}
				{handleKeyVal("Quận/Huyện", MapInfo.district(order.shipInfo?.district))}
				{handleKeyVal("Phường/Xã", MapInfo.ward(order.shipInfo?.ward))}
				{order.shipInfo?.street && handleKeyVal("Đường / Phố", order.shipInfo?.street)}
				{order?.note && handleKeyVal("Ghi chú", order.note)}
			</>
		)
	}

	function workShift(id) {
		switch (id) {
			case 1:
				return "Sáng";
			case 2:
				return "Chiều";
			case 3:
				return "Tối";
			default:
				return "";
		}
	}

	const totalPrice = () => {
		let total = 0;
		order.products.forEach(product => {
			total += product.price * product.quantity;
		});
		return total;
	}

	return (
		<Modal title={title} open={visible} onCancel={onCancel} onOk={onCancel} okText={okText} cancelText={cancelText} width={1000}>
			<div className="flex flex-row between" id="OrderView">
				<div className="w55">
					{orderInfo()}
					{
						order?.status ==="NOT_CREATED" && order?.shippingType ==="GHTK" && (<Button type="primary" className="btn-print" onClick={handleShipping} >Tạo đơn</Button>)
					}
				</div>

				<div className="w40">
					<div className="products">
						<div className="list">
							{order.products.map((product, index) => (
								<div key={index} className="product">
									{handleProduct(product)}
								</div>
							))}
						</div>
					</div>
					<div className="pickInfo  ptop ">
						<div className="list">
							<div className="label flex between">
								<span  className="font16 bold" >Ngày lấy hàng:</span>
								<span  className="font16 " >{toDate(order.pickupDate).toDateDay()}</span>
							</div>
							<div className="label flex between">
								<span  className="font16 bold"  >Ca lấy hàng:</span>
								<span  className="font16" >{workShift(order.pickupShift)}</span>
							</div>
						</div>				
					</div>
					<div className="DeliverInfo">
						<div className="list">
							<div className="label flex between">
								<span className="font16 bold" >Ca giao hàng:</span>
								<span className="font16 " >{workShift(order.deliverShift)}</span>
							</div>
						</div>				
					</div>
					<div className="priceInfo">
						<div className="list">
							<div className="label flex between">
								<span className="font16 bold" >Tổng tiền hàng:</span>
								<span className="font16">{totalPrice().toLocaleString()}đ</span>
							</div>
							<div className="label flex between">
								<span className="font16 bold">Tiền ship:</span>
								<span className={order.freeShip ? "strike font16" :"font16"}>{(order?.shipFee).toLocaleString()}đ</span>
							</div>
							<div className="label flex between">
								<span className="font16 bold">Giảm giá:</span>
								<span className={"font16"}>{(order?.discount).toLocaleString()}đ</span>
							</div>
							
							<div className="label flex between">
								<span className="font16 bold">Tổng tiền:</span>
								<span className="font16">{((totalPrice() + (order.freeShip ? 0:order?.shipFee)) - order?.discount).toLocaleString()}đ</span>
							</div>
						</div>
					</div>
					
				</div>
                
			</div>
		</Modal>
	)
}