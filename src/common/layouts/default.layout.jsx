import { Layout,Menu,Image,Typography, Avatar,Tag ,Badge ,Popconfirm ,Alert,Drawer,List, Button    } from "antd"
import "./default.scss"
import { CgLogOut } from "react-icons/cg"
import logo from "@assets/icon/logo.png"
import profile from "@assets/icon/profile.png"
import { useEffect, useState,useRef } from "react"
import {AiOutlineMenuUnfold,AiOutlineMenuFold} from "react-icons/ai"
import {BsBell} from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { removeAccessToken,getByKey,setByKey } from "@common/utils/locaStore.util"
import { useDispatch,useSelector } from "react-redux"
import { getMe,uploadAvatar } from "@redux/auth/auth.thunk"
import { selectUserInfo } from "@redux/auth/auth.slice"
import { getPathStaticFileServer, toDate } from "@common/utils/method.util"
import FilterItems from "@common/layouts/default.item"
import "@common/providers/socket.io"
import socketNoti from "@common/providers/socket.noti"
import {getNoti, getNotis, getUnread,setSelect,setUnread} from '../../redux/noti/noti.slice';
import {rendersNoti, RenderAvatarNoti, RenderName, renderDiscription} from '../utils/method.util';
import Dropdown from 'react-bootstrap/Dropdown';
const {Sider, Content } = Layout;
export default function DefaultLayout({children,name,path='user'})
{
	const [collapsed,setCollapsed] = useState(getByKey("collapsed") === "true" ? true : false)
	const [isShowNoti,setIsShowNoti] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const UserInfo = useSelector(selectUserInfo)
	const TotalUnread = useSelector(getUnread)
	const Notis = useSelector(getNotis)
	const drawerRef = useRef(null);
	useEffect(() => {
		var isCollapsed = getByKey("collapsed") === "true" ? true : false
		if(isCollapsed !== collapsed)
		{
			setCollapsed(isCollapsed)
		}
	},[collapsed])

	useEffect(() => {
		dispatch(getMe())
		socketNoti.connect()
	},[dispatch])



	useEffect(() => {
		if(isShowNoti === true){
			socketNoti.emit("readNoti")
			dispatch(setUnread(0))
			dispatch(setSelect(true))
		}
		else{
			dispatch(setSelect(false))
		}
	},[isShowNoti])

	const toggle = () => {
		setCollapsed(!collapsed)
		setByKey("collapsed",!collapsed)
	}

	const SignOut = () => {
		removeAccessToken()
		navigate("/")
	}

	const uploadFile = () => {
		document.getElementById("userUploadFile").click()
	}

	const handleUploadFile = (e) => {
		if(e.target.files[0])
		{
			dispatch(uploadAvatar(e.target.files[0]))
		}
	}

	const loadMore = () => {
		socketNoti.emit("loadNoti",{skip:Notis.length})
		
	}



	const handleNavigate = (e) => {
		navigate("/"+e.key)
	}
	return(
		<div id="layout">
			<div>
				<Sider id="sidebar" width={collapsed ? 200 : 79}>
					<div id="sidebar-child">
						<div className="child1">
							<div className="logo-main">
								<Image width={collapsed ? 200 : 70} src={logo} preview={false} />
							</div>
						</div>
						<div className="child2">
							<Menu onClick={handleNavigate} theme="light" mode="inline" defaultSelectedKeys={[path]} collapsed={collapsed.toString()} items={FilterItems(UserInfo?.role)} />
							<div>
								<input type="file" className="hidden" onChange={handleUploadFile}  name="userUploadFile" id="userUploadFile" accept="image/*" />
								<div className="user-info">
									<Avatar size={collapsed ? 150 : 50} src={ UserInfo?.avatar ? getPathStaticFileServer(UserInfo?.avatar) : profile} onClick={uploadFile} />
									<div className="info">
										{ collapsed && <Typography className="name">{UserInfo?.fullname}</Typography>}
										<Tag className="tagRole" color="green">{UserInfo?.role}</Tag>
									</div>
								</div>
								<Popconfirm title="Đăng xuất" description="Bạn có chắc muốn đăng xuất khỏi hệ thống" okText="Thoát" cancelText="Hủy" onConfirm={SignOut}>
									<div className="logoutBtn">
										<CgLogOut size={30}/>
										{collapsed && <Typography className="title">Đăng xuất</Typography>}
									</div>
								</Popconfirm>
							</div>
						</div>
					</div>
				</Sider>
			</div>
			<Layout id="contentBox" className={collapsed ? "full":"small"} >
				<div id="contentBox-head">
					<div className="left-box">
						<div className="header-button">
							{ collapsed ? <AiOutlineMenuFold size={30} onClick={toggle}/> : <AiOutlineMenuUnfold size={30} onClick={toggle}/> }
						</div>
						<div className="header-title">
							<span>{name}</span>
						</div>
					</div>
					<div className="right-box">
						<div className="btn"  >
						<Badge count={TotalUnread ?? 0 } showZero={true}>
							<BsBell onClick={()=>setIsShowNoti(!isShowNoti)} size={25}/>
						</Badge>
						<Drawer extra={<Button onClick={loadMore} >Load Thêm</Button>} className="notibox" title="Thông báo"  placement="right" open={isShowNoti} onClose={(e)=> setIsShowNoti(!isShowNoti)} >
							<div ref={drawerRef}>
								<List id="notilist" dataSource={Notis} 
								renderItem={(item, index) => (
									<List.Item className="noti-item">
									<div id="time-create">{toDate(item.createdAt).toDateTimeDay()}</div>
									<List.Item.Meta
										avatar={RenderAvatarNoti(item)}
										title={RenderName(item)}
										description={renderDiscription(item)}
									/>
									</List.Item>
								)}
								>
								</List>
							</div>
						</Drawer>
							
						</div>
					</div>
				</div>
				<Content id="contentBox-body">
					<div className="content-box">
						{children}
					</div>
				</Content>
				
			</Layout>
		</div>
	)
}