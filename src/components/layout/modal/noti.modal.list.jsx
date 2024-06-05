import { useSelector } from "react-redux"
import { getNotis } from "../../redux/noti/noti.slice"
import { Modal } from "antd"
export function NotiModalList(props)
{
	const { show } = props
	const NotiS = useSelector(getNotis)
	

}