import DefaultLayout from "@common/layouts/default.layout";
import { Button,Input,Table,Space,Select,Pagination,Popconfirm  } from "antd";
import profile from "@assets/icon/profile.png";
import "./userManager.scss";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectListUser,selectSelectUser,SetUser } from "@redux/users/users.slice";
import { getListUser,deleteUser,updateStatusUser } from "@redux/users/users.thunk";
import { UserCreateModal} from "@components/users/modals/users.modal.create";
import { UserUpdateModal} from "@components/users/modals/users.modal.update";
import { getPathStaticFileServer } from "@common/utils/method.util";
export default function UserManager() 
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
	const selectUser = useSelector(selectSelectUser);
	const dataSrc = useSelector(selectListUser);

	useEffect(() => {
		dispatch(getListUser(query));
	},[dispatch, query,selectUser])

	const handleQuery = (name,value) => {
		setQuery({
			...query,
			[name]:value
		})
	}

	const colums = [
		{
			title: "STT",  
			dataIndex: "index",
			width:"50px",
			align:"center",
			render : (text,record,index) => index + 1
		},
		{
			title: "Họ và tên",
			dataIndex: "fullname",
		},
		{
			title: "hình ảnh",
			dataIndex: "avatar",
			align:"center",
			render : (text,record,index) => <img src={record?.avatar ? getPathStaticFileServer(record?.avatar): profile} alt="" style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
		},
		{
			title: "Số điện thoại",
			dataIndex: "phone",
			width:"150px",
		},
		{
			title: "Tài khoản",
			dataIndex: "username",
		},
		{
			title: "Chức vụ",
			dataIndex: "role",
			align:"center",
		},
		{
			title: "Chức Năng",
			dataIndex: "action",
			align:"center",
			render : (text,record,index) => {
				return (
					<Space.Compact size="middle">
						<Button type="primary" size="large"  onClick={()=> setSetting({...setting,showModalUpdate:true})}  >Sửa</Button>
						<Button type="dashed" className="btn-status" 
								danger size="large"
								onClick={()=>dispatch(updateStatusUser({id:record.id,status:record.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"}))}
								>{record?.status === "ACTIVE" ? 'Khóa':'Mở khóa'}</Button>
						<Popconfirm
							title="Bạn có chắc chắn muốn xóa user này không?"
							okText="Xóa"
							cancelText="Hủy"
							onConfirm={()=>dispatch(deleteUser(selectUser.id))}
						>
							<Button type="primary" danger size="large">Xóa</Button>
						</Popconfirm>
					</Space.Compact>
				)
			}
		},
	]
	return (
		<DefaultLayout name="Quản lý user" path={"user"}>
			{ setting.showModalCreate && <UserCreateModal title={"Thêm user mới"} visible={setting.showModalCreate} onCancel={()=> setSetting({...setting,showModalCreate:false}) } />}
			{ setting.showModalUpdate && <UserUpdateModal title={"Chỉnh sửa thông tin user"} visible={setting.showModalUpdate} onCancel={()=> setSetting({...setting,showModalUpdate:false}) } />}
			<div id="UserManager">
				<div className="header">
					<div className="row">
						<div className="item">
							<Button type="primary" size="large"  onClick={()=> setSetting({...setting,showModalCreate:true})} >Thêm mới user</Button>
						</div>
						<div className="item">
							<Input.Search onChange={(e)=> handleQuery("query",e.target.value)} placeholder="Tìm kiếm user" size="large" style={{width:"300px"}} name="query"/>
						</div>
						<div className="item">
							<Select defaultValue="" style={{ width: 100 }} size="large" name="role" onSelect={(e)=> handleQuery("role",e)} >
								<Select.Option value="">Tất cả</Select.Option>
								<Select.Option value="ADMIN">Admin</Select.Option>
								<Select.Option value="LEADER">Leader</Select.Option>
								<Select.Option value="SALE">Sale</Select.Option>
								<Select.Option value="SHIP">Ship</Select.Option>
							</Select>
						</div>
					</div>
					<div className="row">
						<div className="item">
							<Select defaultValue={query?.size || 10} style={{ width: 140 }} size="large" name="size" onChange={(e)=> handleQuery("limit",e)} >
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
							onClick: () => dispatch(SetUser(data))
						}
					}} className="table" dataSource={dataSrc.data} rowKey={(record) => record.id} columns={colums} pagination={false} />
					<div className="pagination">
						<Pagination  onChange={e=> handleQuery("page",e)} current={query.page}  pageSize={query?.size} total={dataSrc?.total} />
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}