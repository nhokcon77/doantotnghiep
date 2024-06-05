import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrder, getListOrder } from '@redux/orders/orders.thunk';
import DefaultLayout from "@common/layouts/default.layout";
import { selectListOrder,selectSelectOrder,SetOrder,NewOrderComfine } from '@redux/orders/orders.slice';
import { Button,Input,Table,Pagination, Space , Typography ,DatePicker,Segmented,Checkbox } from "antd";
import './shipManager.scss'
import { padLeft,toDate,getFromDate,handlePrint } from '@common/utils/method.util';
import { orderStatusFillter} from './shipManager.item';
import { OrderViewModal } from '@components/orders/modals/orders.modal.view';
import { OrderTimelineModal } from '@components/orders/modals/orders.modal.timeline';
import { OrderReturnModal } from '@components/orders/modals/orders.modal.return';
import { OrderUpdateStatusModal } from '@components/orders/modals/orders.modal.update.status';
import dayjs from 'dayjs';
import socket from "@common/providers/socket.io"
import ghtkService from '@services/ghtk.service';
import {toStatusOrder, toStatusOrderColor} from '../../../common/utils/method.util';
import {updateStatusByshipOrderNotCreate} from '../../../redux/orders/orders.thunk';

export function ShipManager()
{ 
	const dispatch = useDispatch();

	const [query,setQuery] = useState({
		page:1,
		limit:10,
		sort:[
			'createdAt:-1'
		],
		fromDate: new Date().getTime(),
		toDate: new Date().getTime(),
		type:"CONFIRM",
		isReload:false,
	});
	const [setting,setSetting] = useState({
		showModalView:false,
		showModalTimeline:false,
		showModalReturn : false,
		showModalUpdateStatus:false,
	})
	const [selectOrders,setSelectOrders] = useState([])
	const dataSrc = useSelector(selectListOrder);
	const selectOrder = useSelector(selectSelectOrder);
	const handleQuery = (name,value) => {
		if(name==="date")
		{
			if(value == null)
			{
				setQuery({...query,fromDate:"",toDate:""})
			}
			else
			{
				setQuery({...query,...getFromDate(value)})
			}
		}
		else
		{
			setQuery({...query,[name]:value})
		}
	}

	const handleChangeSize = (current, size) => {
		setQuery({...query,limit:size,page:current})
	}

	const handleChangeStatus = (value) => {
		setQuery({...query,status:value,page:1})
	}


	const handleSelectOrder = (id) => {
		if(selectOrders.includes(id))
		{
			setSelectOrders(selectOrders.filter((item) => item !== id))
		}
		else
		{
			setSelectOrders([...selectOrders,id])
		}
	}

	const checked = (id) => {
		return Array.from(selectOrders).includes(id)
	}

	useEffect(() => {
		dispatch(getListOrder(query));
	},[dispatch,query,selectOrder])

	useEffect(() => {
		socket.on("CONFIRMED_ORDER", (data) => {
			dispatch(NewOrderComfine(data))
		})

		return () => {
			socket.off("CONFIRMED_ORDER")
		}
	})

	const handlePrintOrder = (id) => {
		ghtkService.printOrder(id).then((res) => {
			handlePrint(res,id)
		}).catch(console.log)
	}

	const returnOrderToSale = (record) => {
		dispatch(updateStatusByshipOrderNotCreate({id:record.id,...query}))
	}

	const colums = [
		{
			title :"Chọn",
			width: 10,
			align:"center",
			render: (text, record) => {
				if(record.shippingType !== "GHTK")
				{
					return <div></div>
				}
				switch(record.status)
				{
					case "PENDING":
						
						return (
							<Checkbox checked={checked(record.shippingCode)} onChange={(e) => handleSelectOrder(record.shippingCode)} />
						)
					default:
						return <div></div>
				}
			}
		},
		{
			title :"STT",
			render: (text, record, index) => index + 1,
			width: 10,
			align:"center"
		},
		{
			title: 'Mã đơn',
			dataIndex: 'code',
			key: 'code',
			align:"center",
			width: 150,
			render: text => (<Typography>#{padLeft(text,'0',13)}</Typography>),
		},
		{
			title: 'Khách hàng',
			dataIndex: 'name',
			key: 'name',
			width: 200,
			render: text => (<Typography>{text}</Typography>),
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: 'phone',
			width: 130,
			render: text => (<Typography>{text}</Typography>),
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'shipInfo',
			key: 'shipInfo',
			width: 300,
			render: shipInfo => (<Typography>{shipInfo?.address}</Typography>),
		},
		{
			title: 'Sản phẩm',
			dataIndex: 'products',
			render: products => {
				return (
					<Space className='flex flex-col flex-start'>
						{products.map((product,index)=> {
							return (
								<div>
									<Typography key={index}>- {product?.name}</Typography>
								</div>
							)
						})}
					</Space>
				)
			},
			width: 350,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			render: createdAt => (<Typography>{toDate(createdAt).toDateTimeDay()}</Typography>),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: status => (<Typography style={{color:toStatusOrderColor(status)}}>{toStatusOrder(status)}</Typography>),
		},
		{
			title: 'Chức năng',
			render: (text, record) => {

				return (
				<Space.Compact  size="middle" >
					<Button onClick={()=> setSetting({...setting,showModalTimeline:true})} type="dashed">Lịch sử</Button>
					<Button onClick={()=> setSetting({...setting,showModalView:true})} type="primary">Xem</Button>
					{ record.status === "PENDING" && record.shippingType === 'GHTK' && <Button onClick={()=>handlePrintOrder(record?.shippingCode)} >In đơn</Button>}
					{ record.status === "RETURN" && <Button onClick={()=> setSetting({...setting,showModalReturn:true})} type="primary">Đã nhận hàng</Button>}
					{ record.shippingType !== 'GHTK' && <Button onClick={()=> setSetting({...setting,showModalUpdateStatus:true})} type="primary">Cập nhật đơn hàng</Button>}
					{ record.status === "PENDING" && record.shippingType === 'GHTK' && <Button danger type="primary" onClick={()=>handleCancelOrder(record?.shippingCode)}>Hủy đơn</Button>}
					{ record.status === "NOT_CREATED" && <Button danger type="primary" onClick={()=>returnOrderToSale(record)}>Hoàn đơn về sale</Button> }
				</Space.Compact>)
			}
		}
	]

	const printOrderSelected = () => {
		ghtkService.printOrders(selectOrders).then(async (res) => {
			const test =await res.text()
			handlePrint(null,test)
		}).catch(console.log)
	}

	const selectAll = () => {
		if(selectOrders.length === 0)
		{
			// lấy tất cả đơn ở trạng thái chờ xác nhận
			const orderPending = dataSrc?.data.filter((item) => item.status === "PENDING")
			const orderIds = orderPending.map((item) => item.shippingCode)
			setSelectOrders(orderIds)
		}
		else
		{
			setSelectOrders([])
		}
	}

	const OnClose = (key) => {
		setSetting({...setting,[key]:false})
		setQuery({...query,isReload:!query.isReload})
	}

	const handleCancelOrder = (e) => {
		dispatch(cancelOrder(e))
	}


	return (
		<DefaultLayout name="Quản lý đơn" path={'ship'} >
			{ setting.showModalView && <OrderViewModal title={"Thông tin đơn"} visible={setting.showModalView} onCancel={()=> OnClose('showModalView') } />}
			{ setting.showModalTimeline && <OrderTimelineModal title={"Lịch sử đơn"} visible={setting.showModalTimeline} onCancel={()=> OnClose('showModalTimeline') } />}
			{ setting.showModalReturn && <OrderReturnModal title={"Đã nhận hàng"} visible={setting.showModalReturn} onCancel={()=> OnClose('showModalReturn') } />}
			{ setting.showModalUpdateStatus && <OrderUpdateStatusModal title={"Cập nhật đơn hàng"} visible={setting.showModalUpdateStatus} onCancel={()=> OnClose('showModalUpdateStatus') } />}
			<div id="OrderManager">
				<div className="header flex-row between">
					<div className='flex flex-col'>
						<div className="row">
							<div className="item">
								<Input.Search onChange={(e)=> handleQuery("query",e.target.value)} placeholder="Tìm kiếm order" size="large" style={{width:"300px"}} name="query"/>
							</div>
							<div className="item">
								<DatePicker.RangePicker defaultValue={[dayjs(toDate(new Date()).toDateDay(), "DD/MM/YYYY"), dayjs(toDate(new Date()).toDateDay(), "DD/MM/YYYY")]} format={(value)=> value.format("DD/MM/YYYY")} onChange={(e)=> handleQuery("date",e) } size="large" style={{width:"300px"}} name="date"/>
							</div>
						</div>
					</div>
					<div className="item">
						<Space.Compact size="large">
							<Button onClick={selectAll} size='large' disabled={query.status !== 'PENDING'} >Chọn tất cả</Button>
							<Button onClick={printOrderSelected} disabled={query.status !== 'PENDING'} size='large' >In đơn đã chọn</Button>
						</Space.Compact>
					</div>
				</div>
				
				<div className="content">
					<Segmented size='large'  options={orderStatusFillter(dataSrc?.statuses)} onChange={handleChangeStatus}  />
					<Table onRow={(data,index)=> {
						return {
							onClick: () => dispatch(SetOrder(data))
						}
					}} className="table" dataSource={dataSrc?.data || []} rowKey={(record) => record.id} columns={colums} pagination={false} />
					<div className="pagination">
						<Pagination showSizeChanger   onChange={handleChangeSize} onShowSizeChange={handleChangeSize} current={query.page}   total={dataSrc?.total} />
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}