import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrder } from '@redux/orders/orders.thunk';
import DefaultLayout from "@common/layouts/default.layout";
import { selectListOrder,selectSelectOrder,SetOrder } from '@redux/orders/orders.slice';
import { Button,Input,Table,Pagination, Space , Typography ,DatePicker,Segmented } from "antd";
import './orderManager.scss'
import { padLeft,toDate,getFromDate} from '@common/utils/method.util';
import { orderTypeFillter} from './orderManager.item';
import { OrderUpdateModal } from '@components/orders/modals/orders.modal.update';
import { OrderCreateModal } from '@components/orders/modals/orders.modal.create';
import socket from '@common/providers/socket.io';
import dayjs from 'dayjs';
import {toTypeOrder, toTypeOrderColor} from '../../../common/utils/method.util';
const dateFormat = 'DD/MM/YYYY';

export function OrderManager()
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
		isReload : false
	});
	const [setting,setSetting] = useState({
		showModalCreate:false,
		showModalUpdate:false,
	})
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

	const handleChangeType = (value) => {
		setQuery({...query,type:value,page:1})
	}
	
	useEffect(() => {
		socket.connect();
		return () => {
			socket.disconnect();
		}
	},[])


	useEffect(() => {
		dispatch(getListOrder(query));
	},[dispatch,query,selectOrder])


	const colums = [
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
			width: 180,
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
			width: 150,
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
			title:'Cảnh báo',
			render: (text, record) => {
				switch(record.addOnsInfo?.alert)
				{
					case 1:
						return (<Typography style={{color:"#FFA500"}}>Đơn trùng</Typography>)
					case 2:
						return (<Typography style={{color:"#FF0000"}}>Không tìm thấy SP</Typography>)
					default:
						return (<Typography style={{color:"#808080"}}></Typography>)
				}
			},
			width: 150,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'type',
			render: type => (<Typography style={{color:toTypeOrderColor(type)}}>{toTypeOrder(type)}</Typography>),
			width: 150,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'saleNote',
			width: 150,
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			width: 150,
			render: createdAt => (<Typography>{toDate(createdAt).toDateTimeDay()}</Typography>),
		},
		{
			title: 'Chức năng',
			render: (text, record) => {
				if(record.type !== "CONFIRM")
				{
					return (
						<Space size="middle">
							<Button type="primary" onClick={()=> setSetting({...setting,showModalUpdate:true})} >Cập nhật Đơn</Button>
						</Space>
					)
				}
			},
			width: 150,
		}
	]

	return (
		<DefaultLayout name="Quản lý đơn" path={'order'} >
			{ setting.showModalUpdate && <OrderUpdateModal title={"Chỉnh sửa thông tin đơn"} visible={setting.showModalUpdate} onCancel={()=> setSetting({...setting,showModalUpdate:false}) } />}
			{ setting.showModalCreate && <OrderCreateModal title={"Thêm mới đơn"} visible={setting.showModalCreate} onCancel={()=> setSetting({...setting,showModalCreate:false}) } />}
			
			<div id="OrderManager">
				<div className="header flex-row between">
					<div className='flex flex-col'>
						<div className="row">
							<div className="item">
								<Button type="primary" size="large"  onClick={()=> setSetting({...setting,showModalCreate:true})} >Thêm mới đơn</Button>
							</div>
							<div className="item">
								<Input.Search onChange={(e)=> handleQuery("query",e.target.value)} placeholder="Tìm kiếm order" size="large" style={{width:"300px"}} name="query"/>
							</div>
							<div className="item">
								<DatePicker.RangePicker defaultValue={[dayjs(toDate().toDateDay(), dateFormat), dayjs(toDate().toDateDay(), dateFormat)]} format={(value)=> value.format("DD/MM/YYYY")} onChange={(e)=> handleQuery("date",e) } size="large" style={{width:"300px"}} name="date"/>
							</div>
						</div>
					</div>
				</div>

				<div className="content mt-1">
					<Segmented size='large'  options={orderTypeFillter(dataSrc?.types)} onChange={handleChangeType}  />
					<Table onRow={(data,index)=> {
						return {
							onClick: () => dispatch(SetOrder(data))
						}
					}} className="table" dataSource={dataSrc?.data || []} rowKey={(record) => record.id} columns={colums} pagination={false} />
					<div className="pagination">
						<Pagination showSizeChanger  onChange={handleChangeSize} onShowSizeChange={handleChangeSize} current={query.page}  pageSize={query?.limit} total={dataSrc?.total} />
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}