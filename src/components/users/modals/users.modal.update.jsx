import { Modal,Form,Input,Select } from "antd";
import { selectSelectUser } from "@redux/users/users.slice";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {  updateUser } from "@redux/users/users.thunk";
import validator from "validator";

export const UserUpdateModal = ({ title, visible, onCancel,okText="Ok",cancelText="Hủy" }) => {

	const SelectUser = useSelector(selectSelectUser)
	const [user,setUser] = useState(SelectUser)
	const dispatch = useDispatch()
	const [form] = Form.useForm()
	const handleChange = (e) => {
		form.setFieldsValue({...user,[e.target.name]:e.target.value})
		setUser({...user,[e.target.name]:e.target.value})
	}

	const handleBySelect = (value) => {
		form.setFieldsValue({...user,role:value})
		setUser({...user,role:value})
	}
	
	useEffect(() => {
		form.setFieldsValue(user)
	},[SelectUser, form])


	const handle = () => {
		// check phone
		if(!validator.isMobilePhone(user.phone)){
			form.setFields([{name:"phone",errors:["Số điện thoại không hợp lệ"]}])
			return
		}
		// check fullname
		if(!validator.isLength(user.fullname,{min:6,max:50})){
			form.setFields([{name:"fullname",errors:["Họ và tên không hợp lệ"]}])
			return
		}
		form.validateFields().then((values) => {
			dispatch(updateUser({id:user.id,data:user}))
			onCancel()
			form.resetFields()
		});
	}

    return (
        <Modal open={visible} title={title} onOk={handle} okText={okText} cancelText={cancelText} onCancel={onCancel} >
			<Form form={form}  onChange={handleChange} layout="vertical" >
				<Form.Item name="fullname" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
					<Input name="fullname"  />
				</Form.Item>
				<Form.Item name="username"  label="Tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}>
					<Input name="username"  readOnly={true} disabled />
				</Form.Item>
				<Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
					<Input name="phone" />
				</Form.Item>
				<Form.Item name="role" label="Chức vụ" rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}>
					<Select name="role" onChange={handleBySelect} >
						<Select.Option value="ADMIN">ADMIN</Select.Option>
						<Select.Option value="LEADER">LEADER</Select.Option>
						<Select.Option value="SALE">SALE</Select.Option>
						<Select.Option value="SHIP">SHIP</Select.Option>
					</Select>
				</Form.Item>
			</Form>
        </Modal>
    );
}