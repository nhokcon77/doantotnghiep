import { Form, Modal, Input, Button, Select,InputNumber,AutoComplete, Radio,DatePicker,Switch } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { selectSelectOrder } from '@redux/orders/orders.slice'
import { useState } from 'react'
import { useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import {ToLinkProduct, coverPrice, Notification, toDate} from '@common/utils/method.util';
import { getPronvice,getDistrict,getWard, MapInfo } from '@common/utils/map.util'
import { updateOrder  } from '@redux/orders/orders.thunk'
import productService from '@services/product.service'
import ghtkService  from '@services/ghtk.service'
import {updateTypeOrder} from '../../../redux/orders/orders.thunk';
import dayjs from 'dayjs';
import {getTomorrow} from '../../../common/utils/method.util';
import debounce from 'lodash/debounce';
import {getInfo} from '../../../common/utils/map.util';
const options = [
	{ label: 'Ca Sáng', value: 1 },
	{ label: 'Ca Chiều', value: 2 },
	{ label: 'Ca Tối', value: 3 },
];
const optionShip = [
	{ label: 'Giao hàng tiết kiệm', value: "GHTK" },
	{ label: 'Khác', value: "ORTHER" },
]


export function OrderUpdateModal({ title, visible, onCancel,okText="Ok",cancelText="Hủy" })
{
	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const selectOrder = useSelector(selectSelectOrder)
	const [location,setLocation] = useState({
		province:null,
		district:null,
		ward:null,
		selectedProvince:null,
		selectedDistrict:null,
		selectedWard:null,
	})
	const [price,setPrice] = useState({
		ship:0,
		total:0
	})
	const [discount,setDiscount] = useState(0)
	const [select,setSelect] = useState([])
	const [isFreeShip,setIsFreeShip] = useState(false)
	const [shippingFee,setShippingFee] = useState(0)
	const [order,setOrder] = useState(selectOrder)
	const OnSearchProduct = (value,index) => {
		productService.getListProduct(1,1000,value).then((res) => {
			const listLabelProduct = res.data.map((item) => {
				return {
					value:item.name,
					label:item.name

				}
			})
			var cloneSelect = select
			cloneSelect[index] = {...cloneSelect[index],listLabelProduct,productsx:res.data}
			form.setFieldsValue({...order,products:cloneSelect,...form.getFieldsValue()})
			setSelect(cloneSelect)
		})
		var cloneSelect = select
		cloneSelect[index] = {...cloneSelect[index],name:value}
		form.setFieldsValue({...order,products:cloneSelect,...form.getFieldsValue()})
		setSelect(cloneSelect)
	}

	const OnSelectLocation = (value,name) => {
		switch(name)
		{
			case "province":
				setLocation({...location,selectedProvince:value,district:[],ward:[]})
				break;
			case "district":
				setLocation({...location,selectedDistrict:value,ward:[]})
				break;
			default:
				setLocation({...location,selectedWard:value})
				caculateShipping()
				break;
		}
	}




	const handleSelectProduct = (value,index) => 
	{
		const product = select[index].productsx.find((item) => item.name === value)
		const options = product.options || []
		const listLabelOption = options.map((item) => {
			return {
				value:item.name,
				label:item.name
			}
		})

		var cloneSelect = select
		cloneSelect[index] = {
			...cloneSelect[index],
			product,
			option:null,
			options,
			listLabelOption,
			name:value,
			quantity:1
		}
		setSelect(cloneSelect)
		form.setFieldsValue({...order,...form.getFieldsValue(),products:cloneSelect})
	}

	const caculatePrice = (data) => {
		var total = 0
		let cloneSelect = data || select
		cloneSelect.forEach((item) => {
			total += coverPrice().toNumber(item.price)
		})
		setPrice({...price,total})
		caculateShipping(cloneSelect)
	}

	const handleUpdateOrder = () => {
		
		if(form.getFieldValue("type") === "")
		{
			Notification("error","Vui lòng chờ kiểm tra lại loại đơn hàng").error()
			return;
		}
		if(form.getFieldValue("type") !== "CONFIRM" && form.getFieldValue("type") !== "ORDER_TO_SHIP")
		{
			const data = {
				id:order.id,
				type:form.getFieldValue("type")
				
			}
			if(form.getFieldValue("saleNote") !== "")
			{
				data.saleNote = form.getFieldValue("saleNote")
			}
			dispatch(updateTypeOrder(data))
			onCancel()
			return;
		}

		form.validateFields().then((values) => {
			let bodyJson = {}
			bodyJson.id = order.id
			bodyJson.name = values.name
			bodyJson.phone = values.phone
			bodyJson.note = values.note
			bodyJson.type = values.type
			bodyJson.pickupShift = values.pickupShift
			bodyJson.deliverShift = values.deliverShift
			if(values.pickupDate)
			{
				bodyJson.pickupDate = values.pickupDate.format("DD/MM/YYYY")
			}
			else
			{
				bodyJson.pickupDate = toDate(getTomorrow()).toDateDay()
			}
			bodyJson.isFreeShip = values.isFreeShip
			
			if(!MapInfo.checkProvince(values.province) && !location.selectedProvince)
			{
				Notification("error","Vui lòng chọn đúng Tỉnh/thành phố").error()
				return;
			}

			if(!MapInfo.checkDistrict(values.district) && !location.selectedDistrict)
			{
				Notification("error","Vui lòng chọn đúng Quận/huyện").error()
				return;
			}

			if(!MapInfo.checkWard(values.ward) && !location.selectedWard)
			{
				Notification("error","Vui lòng chọn đúng Phường/xã").error()
				return;
			}

			bodyJson.shipInfo = {
				province:location.selectedProvince.data,
				district:location.selectedDistrict.data,
				ward:location.selectedWard.data,
				street:values.street,
				address:values.address,
			}
			bodyJson.discount = coverPrice().toNumber(values.discount)
			if(values.products.length === 0)
			{
				Notification("error","Vui lòng chọn sản phẩm").error()
				return;
			}
			console.log(bodyJson.products)
			bodyJson.products = values.products.map((item,index) => {
				return {
					productId:item.product_id || item.product.id,
					optionId:item.option_id || order.products[index].option.id  ,
					quantity:item.quantity
				}
			})
			bodyJson.shippingType = values.shippingType
			console.log(bodyJson)
			dispatch(updateOrder(bodyJson))
			onCancel()
		}).catch(console.log)
	}

	const caculateShipping = async (newSelect) => {
		if(form.getFieldValue("province") && form.getFieldValue("district") && form.getFieldValue("ward"))
		{
			const totalWeight = (newSelect||select).reduce((total,item) => {
				return total + coverPrice().toNumber(item.weight)
			},0)

			const res = await ghtkService.shippingFee({
				"province": form.getFieldValue("province"),
				"district": form.getFieldValue("district"),
				"ward": form.getFieldValue("ward"),
				"address": form.getFieldValue("address"),
				"weight": totalWeight
			  })
			//setPrice({...price,ship:res.fee.fee})
			setShippingFee(res.fee.fee)
		}
	}

	const OnSelectOption = (value,index) => 
	{
		const option = select[index].options.find((item) => item.name === value)
		var cloneSelect = select
		cloneSelect[index] = {
			option,
			...cloneSelect[index],
			optionName:value
		}
		cloneSelect[index].price = coverPrice().toVND(option.price * cloneSelect[index].quantity)
		cloneSelect[index].weight = coverPrice().toVND(option.weight * cloneSelect[index].quantity)
		cloneSelect[index].option = option
		cloneSelect[index].option_id = option.id
		setSelect(cloneSelect)
		caculatePrice()
		form.setFieldsValue({...order,...form.getFieldsValue(),products:cloneSelect})
	}

	const OnChangeQuantity = (value,index) =>{
		var cloneSelect = select
		cloneSelect[index].price = coverPrice().toVND(value * cloneSelect[index].option.price)
		cloneSelect[index].weight = coverPrice().toVND(value * cloneSelect[index].option.weight)
		cloneSelect[index].quantity = value
		setSelect(cloneSelect)
		caculatePrice()
		form.setFieldsValue({...order,...form.getFieldsValue(),products:cloneSelect})
	}
	
	useEffect(() => 
	{ //defaultValue={dayjs(toDate(getTomorrow()).toDateDay(), 'DD/MM/YYYY')}
		const cloneOrder = {
			id:order.id,
			name:order.name,
			phone:order.phone,
			address:order?.shipInfo?.address || "",
			type:"",
			province: getInfo().getNameProvince(order?.shipInfo?.province) || "",
			district: getInfo().getNameDistrict(order?.shipInfo?.province,order?.shipInfo?.district) || "",
			ward: getInfo().getNameWard(order?.shipInfo?.province,order?.shipInfo?.district,order?.shipInfo?.ward) || "",
			street:order?.shipInfo?.street || "",
			note:order.note,
			orderInfo:order.orderInfo,
			shippingType:order.shippingType || "GHTK",
			saleNote:order?.saleNote || "",
			pickupShift:order.pickupShift || 1,
			deliverShift:order.deliverShift || 1,
			isFreeShip:order.freeShip || false,
			pickupDate:order.pickupDate ? dayjs(toDate(new Date(order.pickupDate)).toDateDay(),"DD/MM/YYYY") : dayjs(toDate(getTomorrow()).toDateDay(), 'DD/MM/YYYY'),
		}
		
		if(order.isFreeShip)
		{
			setIsFreeShip(order.isFreeShip)
		}
		cloneOrder.type = "";
		if(order.products.length > 0)
		{
			productService.getProductById(order.products[0].product_id).then((res) => {
				const defaultSelect = {
					product:res,
					listLabelProduct:[],
					name:res.name,
					productsx:[],
					listLabelOption:res.options.map((item) => {
						return {
							value:item.name,
							label:item.name
						}
					}),
					option:res.options[0],
					options:res.options,
					quantity:order.products[0].quantity,
					price:coverPrice().toVND(order.products[0].quantity * res.options[0].price),
					weight:coverPrice().toVND(order.products[0].quantity * res.options[0].weight),
					optionName:res.options[0].name
				}
				setSelect([defaultSelect])
				if(order.type !== "PENDING")
				{
					cloneOrder.type = order.type
				}
				setOrder({...cloneOrder,products:[defaultSelect]})
				form.setFieldsValue({...cloneOrder,products:[defaultSelect]})
				caculatePrice([defaultSelect])
			}).catch(console.log)
		}
		else
		{
			cloneOrder.products = []
			if(order.type !== "PENDING")
			{
				cloneOrder.type = order.type
			}
			setOrder(cloneOrder)
			form.setFieldsValue(cloneOrder)	
		}
		
		
		if(order?.shipInfo?.province)
		{
			const province = getPronvice()
			const district = getDistrict(order?.shipInfo?.province)
			const ward = getWard(order?.shipInfo?.province,order?.shipInfo?.district)
			const selectedProvince = {
				data:order.shipInfo.province
			}
			const selectedDistrict = {
				data:order.shipInfo.district
			}
			const selectedWard = {
				data:order.shipInfo.ward
			}
			setLocation({province,district,ward,selectedDistrict,selectedProvince,selectedWard})
			console.log({province,district,ward,selectedDistrict,selectedProvince,selectedWard})
		}
		else
		{
			const province = getPronvice()
			setLocation({...location,province})
		}
		// const province = getPronvice()
		// setLocation({...location,province})
	},[selectOrder,form])


	const removeProduct = (index,cb) => {
		var cloneSelect = select
		var newSelect = cloneSelect.filter((item,i) => i !== index && item !=null)
		setSelect(newSelect)
		cb()
		setOrder({...order,products:newSelect})
		form.setFieldsValue({...order,...form.getFieldsValue(),products:newSelect})
		caculatePrice(newSelect)
	}

	const addProduct = () => {
		const defaultSelect = {
			product:{},
			listLabelProduct:[],
			name:"",
			productsx:[],
			listLabelOption:[],
			option:{},
			options:[],
			quantity:1,
			price:0,
			weight:0,
			optionName:""
		}

		let cloneSelect = select
		cloneSelect = cloneSelect.filter((item) => item != null)
		cloneSelect.push(defaultSelect)
		setSelect(cloneSelect)
		setOrder({...order,products:cloneSelect})
		form.setFieldsValue({...order,...form.getFieldsValue(),products:cloneSelect,})
	}

	
	const searchWithProvince = debounce((term) => {
		// Thực hiện tìm kiếm dựa trên term
		const province = getPronvice()
		const regex = new RegExp(`\\b${term}`, "i");
		const filterProvince = province.filter((item) => regex.test(item.label))
		setLocation({...location,province:filterProvince})
	}, 100);

	const searchWithDistrict = debounce((term) => {
		// Thực hiện tìm kiếm dựa trên term
		console.log(location.selectedProvince)
		if(location.selectedProvince)
		{
			const district = getDistrict(location.selectedProvince.data)
			const regex = new RegExp(`\\b${term}`, "i");
			const filterDistrict = district.filter((item) => regex.test(item.label))
			setLocation({...location,district:filterDistrict})
		}
		else
		{
			setLocation({...location,district:[]})
		}
	}, 100);

	const searchWithWard = debounce((term) => {
		if(location.selectedDistrict)
		{
			const ward = getWard(location.selectedProvince.data,location.selectedDistrict.data)
			const regex = new RegExp(`\\b${term}`, "i");
			const filterWard = ward.filter((item) => regex.test(item.label))
			setLocation({...location,ward:filterWard})
		}
		else
		{
			setLocation({...location,ward:[]})
		}
	}, 100);


	return (
		<Modal open={visible} title={title} onOk={handleUpdateOrder} okText={okText} cancelText={cancelText} onCancel={onCancel}  width={1500} >
			<Form form={form} layout="vertical" >
				<div className="flex flex-row between">
					<div className="row flex-col w50">
						<Form.Item name="name" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
							<Input name="name"  />
						</Form.Item>
						<Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
							<Input name="phone" />
						</Form.Item>
						<Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
							<Input name="address" />
						</Form.Item>
						<Form.Item name="type" label="Trạng thái đơn" rules={[{ required: true, message: 'Vui lòng chọn trạng thái đơn' }]}>
							<Select name="type">
								<Select.Option value="">Vui lòng chọn trạng thái đơn</Select.Option>
								<Select.Option value="CONFIRM">Xác nhận đơn</Select.Option>
								<Select.Option value="NOT_CONTACT">Không liên lạc được</Select.Option>
								<Select.Option value="PHONE_DESTROY">Số phá hoại</Select.Option>
								<Select.Option value="PHONE_DUPLICATE">Số điện thoại trùng</Select.Option>
								<Select.Option value="NO_PRODUCT">Không có hàng</Select.Option>
								<Select.Option value="ORDER_TO_SHIP">Đơn đi</Select.Option>
								<Select.Option value="CANCEL">Hủy đơn</Select.Option>
							</Select>
						</Form.Item>
						<div className='flex between'>
							<Form.Item name="province" className='minw200'  label="Tỉnh/thành phố" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}>
								<AutoComplete options={location?.province || []}  name="province" onChange={console.log}  onSelect={(e,j)=> OnSelectLocation(j,"province")}>
									<Input name="province" onChange={(e)=>searchWithProvince(e.target.value)} />
								</AutoComplete>
							</Form.Item>
							<Form.Item name="district" className='minw200' label="Quận/huyện" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}>
								<AutoComplete options={location?.district || []}  name="province"  onSelect={(e,j)=> OnSelectLocation(j,"district")}>
									<Input name="province" onChange={(e)=>searchWithDistrict(e.target.value)} />
								</AutoComplete>
							</Form.Item>
							<Form.Item name="ward" className='minw200' label="Phường/xã" rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}>
								<AutoComplete options={location?.ward || []}  name="province"  onSelect={(e,j)=> OnSelectLocation(j,"ward")}>
									<Input name="province" onChange={(e)=>searchWithWard(e.target.value)}  />
								</AutoComplete>
							</Form.Item>
						</div>
						<Form.Item name="street" label="Đường / Phố (Nếu có)" rules={[{ required: false, message: 'Vui lòng chọn hình thức giao hàng' }]}>
							<Input name="street" />
						</Form.Item>
						<Form.Item name="saleNote" label="Ghi chú (Sale)" rules={[{ required: false, message: 'Vui lòng nhập ghi chú' }]}>
							<Input.TextArea name="saleNote" rows={2} />
						</Form.Item>
						<Form.Item name="note" label="Ghi chú (Nếu có)" rules={[{ required: false, message: 'Vui lòng nhập ghi chú' }]}>
							<Input.TextArea name="note" rows={5} />
						</Form.Item>
					</div>
					<div className="row flex-col w48">
						<Form.Item  label="Sản phẩm" required={true}  >
							<Form.List name="products" className="h700">
								{(fields, { add, remove }) => (
									<div>
										<>
											{fields.map(field => (
												<div key={field.key} className="flex flex-row between bbottom mbottom ">
													<div className='flex flex-col w100 between'>
														<div className='flex flex-row w100 between'>
															<Form.Item name={[field.name,"name"]} className='w68'>
																<AutoComplete onSelect={(e)=>handleSelectProduct(e,field.name)} onChange={(e)=> OnSearchProduct(e,field.name)} placeholder="Tên sản phẩm" options={select[field.name]?.listLabelProduct ||[]} >
																	<Input.Search name={"name"} className='w100' />
																</AutoComplete>
															</Form.Item>
															<Form.Item className='w30'  name={[field.name,"optionName"]}>
																<Select placeholder="Chọn màu sắc" name="optionName" onSelect={(e)=>OnSelectOption(e,field.name)} options={select[field.name]?.listLabelOption ||[]} >
																	<Select.Option value="">Vui lòng chọn phiên bản</Select.Option>
																</Select>
															</Form.Item>
														</div>
														<div className='flex flex-row w100 between'>
															<Form.Item className='w30' name={[field.name,"quantity"]} label="Số lượng" required={true} >
																<InputNumber  className='w100' placeholder="Số lượng" min={1} onChange={(e)=> OnChangeQuantity(e,field.name)}  />
															</Form.Item>
															<Form.Item className='w30' name={[field.name,"weight"]} label="Trọng lượng"   >
																<Input placeholder="Trọng lượng" readOnly addonAfter="Gram" />
															</Form.Item>
															<Form.Item className='w30' name={[field.name,"price"]} label="Giá" >
																<Input placeholder="Giá" readOnly  addonAfter="Vnd" />
															</Form.Item>
														</div>
													</div>
													<div className='flex flex-row w10'>
														<Form.Item>
															<Button type="danger" onClick={() =>{removeProduct(field.name,()=>{remove(field.name)})}} icon={<AiOutlineMinusCircle size={20} color='red' />}></Button>
														</Form.Item>
													</div>
												</div>
											))}
										</>
										<Form.Item>
											<Button type="dashed" className='w100' onClick={addProduct} icon={<PlusOutlined />}>
												Thêm sản phẩm
											</Button>
										</Form.Item>
									</div>
								)}	
							</Form.List>
						</Form.Item>
						<div className='flex flex-col between bbottom pbottom'>
							<h3>Thông tin đơn :</h3>
							<div className="flex flex-col between">
								{order?.orderInfo?.split('\n').map((item, index) => ToLinkProduct(item, index))}					
							</div>
						</div>
						<div className='flex flex-col between bbottom pbottom'>
							<div className="flex flex-col between">
								<Form.Item name="isFreeShip" label="FreeShip">
									<Switch checked={isFreeShip} name="isFreeShip"   onChange={setIsFreeShip} />
								</Form.Item>			
							</div>
							<div className="flex flex-col between">
								<Form.Item name="discount" label="Giảm giá">
									<InputNumber onChange={(e)=>setDiscount(Number(e))} name="discount" style={{minWidth:"200px"}} formatter={coverPrice().toVND} parser={coverPrice().toNumber}  min={0} defaultValue={0} addonAfter={"VND"} />
								</Form.Item>			
							</div>
							<div className="flex flex-col between">
								<Form.Item name="shippingType" label="Đơn vị vận chuyển">
									<Radio.Group defaultValue={1} optionType="button" buttonStyle="solid" name="shippingType" options={optionShip} />
								</Form.Item>			
							</div>					


							<div  className="flex flex-col between">
								<Form.Item  name="pickupDate"  label="Ngày lấy hàng" rules={[{ required: false, message: 'Vui lòng chọn ngày lấy hàng' }]}>
									<DatePicker
										format="DD/MM/YYYY"
										placeholder="Chọn ngày lấy hàng"
										className="w40"
										
									/>
								</Form.Item>					
							</div>
							<div className="flex flex-col between ">
								<Form.Item initialValue={1} name="pickupShift" label="Ca lấy hàng" rules={[{ required: true, message: 'Vui lòng chọn ca lấy hàng' }]}>
									<Radio.Group defaultValue={1} optionType="button" buttonStyle="solid" name="pickupShift" options={options} />
								</Form.Item>				
							</div>
							
							<div  className="flex flex-col between">
								<Form.Item initialValue={1} name="deliverShift" label="Ca giao hàng" rules={[{ required: true, message: 'Vui lòng chọn ca giao hàng' }]}>
									<Radio.Group defaultValue={1} optionType="button" buttonStyle="solid" name="deliverShift" options={options} />
								</Form.Item>					
							</div>
						</div>
						<div className='flex flex-col evenly bbottom pbottom ptop'>
							<div className='flex flex-row'>
								<h4 className='w50 block'  style={{color:"#0000FF"}} >Tiền hàng : </h4>
								<h4 className='w50 block' style={{color:"#0000FF"}}  >{coverPrice().toVND(price.total)}</h4>
							</div>
							<div className='flex flex-row'>
								<h4 className='w50 block' style={{color:"#808080"}}  >Phí ship (Tạm tính) : </h4>
								<h4 className={`w50 block  ${isFreeShip ? "strike" :""}`}  style={{color:"#808080"}}  >{coverPrice().toVND(shippingFee)}</h4>
							</div>
							<div className='flex flex-row'>
								<h4 className='w50 block' style={{color:"#808080"}}  >Giảm giá : </h4>
								<h4 className={`w50 block  `}  style={{color:"#808080"}}  >{coverPrice().toVND(discount)}</h4>
							</div>
							<div className='flex flex-row'>
								<h3 className='w50 block' style={{color:"#2ECC40"}}  >Tổng tiền : </h3>
								<h3 className='w50 block' style={{color:"#2ECC40"}}  >{coverPrice().toVND((price.total + (isFreeShip ? 0 : shippingFee)) - discount)}</h3>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</Modal>
	)
}