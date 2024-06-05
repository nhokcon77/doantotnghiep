import DefaultLayout from "@common/layouts/default.layout";
import { useDispatch,useSelector } from "react-redux";
import { useState } from "react";
import { selectProducts,SetProduct,selectProductSelected } from "@redux/products/products.slice";
import { Button,Select,Input,Table,Pagination, Space ,Popconfirm,Avatar} from "antd";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "@redux/products/products.thunk";
import './productManager.scss'
import { getPathStaticFileServer } from "@common/utils/method.util";
import productPng from "@assets/icon/product.png";
import { ProductCreateModal } from "@components/products/modals/products.modal.create";
import { ProductUpdateModal } from "@components/products/modals/products.modal.update";
export default function ProductManager()
{
	const dispatch = useDispatch();

	const [query,setQuery] = useState({
		page:1,
		size:10,
	});
	const [setting,setSetting] = useState({
		showModalCreate:false,
		showModalUpdate:false,
	})
	const dataSrc = useSelector(selectProducts);
	const selectProduct = useSelector(selectProductSelected);
	const handleQuery = (name,value) => {
		if(name!=='page')
		{
			setQuery({...query,[name]:value,page:1})
		}
		else
		{
			setQuery({...query,[name]:value})
		}
	}

	useEffect(() => {
		dispatch(getProducts(query));
	},[dispatch,query,selectProduct])


	const colums = [
		{
			title: "STT",  
			dataIndex: "index",
			width:"50px",
			align:"center",
			render : (text,record,index) => index + 1
		},
		{
			title: "Mã sản phẩm",  
			dataIndex: "code",
			width:"200px",
			align:"center",
			render : (text,record,index) => record?.code 
		},
		{
			title: "Tên sản phẩm",
			dataIndex: "name",
		},
		{
			title:"Hình ảnh",
			dataIndex:"avatar",
			align:"center",
			render : (text,record,index) => <Avatar src={record?.image ? getPathStaticFileServer(record?.image): productPng } alt="" size={100} />
		},
		{
			title:"Mẫu mã - số lượng - số lượng hỏng",
			dataIndex:"options",
			render : (text,record,index) => (
				record?.options?.map((item,index) => (
					<div key={index}>
						<span>{item?.name} - {item.quantity} - {item.quantityBroken}</span>
					</div>
				))
			)
		},
		{
			title:"Chức năng",
			dataIndex:"action",
			render : (text,record,index) => (
				<Space.Compact>
					<Button type="primary" size="small" onClick={()=> setSetting({...setting,showModalUpdate:true})}>Sửa</Button>
					<Popconfirm title="Bạn có chắc chắn muốn xóa ?" onConfirm={()=> dispatch(deleteProduct(record.id))} okText="Có" cancelText="Không">
						<Button type="primary" danger size="small">Xóa</Button>
					</Popconfirm>
				</Space.Compact>
			)
		},
	];

	return (
		<DefaultLayout name="Quản lý kho" path={'warehouse'} >
			{ setting.showModalCreate && <ProductCreateModal title="Thêm mới sản phẩm" visible={setting.showModalCreate} onCancel={()=> setSetting({...setting,showModalCreate:false})} /> }
			{ setting.showModalUpdate && <ProductUpdateModal title="Sửa sản phẩm" visible={setting.showModalUpdate} onCancel={()=> setSetting({...setting,showModalUpdate:false})} /> }
			<div id="ProductManager">
				<div className="header">
					<div className="row">
						<div className="item">
							<Button type="primary" size="large"  onClick={()=> setSetting({...setting,showModalCreate:true})} >Thêm mới Sản phẩm</Button>
						</div>
						<div className="item">
							<Input.Search onChange={(e)=> handleQuery("query",e.target.value)} placeholder="Tìm kiếm sản phẩm" size="large" style={{width:"300px"}} name="query"/>
						</div>
					</div>
					<div className="row">
						<div className="item">
							<Select defaultValue={query?.limit || 10} style={{ width: 140 }} size="large" name="limit" onChange={(e)=> handleQuery("limit",e)} >
								<Select.Option value="10">10</Select.Option>
								<Select.Option value="30">30</Select.Option>
								<Select.Option value="50">50</Select.Option>
								<Select.Option value="100">100</Select.Option>
							</Select>
						</div>
					</div>
				</div>
				<div className="content">
					<Table onRow={(data,index)=> {
						return {
							onClick: () => dispatch(SetProduct(data))
						}
					}} className="table" dataSource={dataSrc.data} rowKey={(record) => record.id} columns={colums} pagination={false} />
					<div className="pagination">
						<Pagination  onChange={e=> handleQuery("page",e)} current={query.page}  pageSize={query?.limit || 10} total={dataSrc?.total} />
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}