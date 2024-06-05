import { Modal,Form,Input,Select } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "@redux/users/users.thunk";
import validator from "validator";
export const UserCreateModal = ({ title, visible, onCreate, onCancel,okText="Ok",cancelText="Hủy" }) => {

	const [form] = Form.useForm()
	const dispatch = useDispatch()
	const [user,setUser] = useState({})
	const handleChange = (e) => {
		form.setFieldsValue({...user,[e.target.name]:e.target.value})
		setUser({...user,[e.target.name]:e.target.value})
	}

	const handleBySelect = (value) => {
		form.setFieldsValue({...user,role:value})
		setUser({...user,role:value})
	}

	const handle = () => {
		// check phone
		if(!validator.isMobilePhone(user.phone)){
			form.setFields([{name:"phone",errors:["Số điện thoại không hợp lệ"]}])
			return
		}
		// check password
		if(!validator.isLength(user.password,{min:6,max:250})){
			form.setFields([{name:"password",errors:["Mật khẩu không hợp lệ"]}])
			return
		}
		// check username
		if(!validator.isLength(user.username,{min:3,max:250})){
			form.setFields([{name:"username",errors:["Tài khoản không hợp lệ"]}])
			return
		}
		// check fullname
		if( !validator.isLength(user.fullname,{min:5,max:50})){
			form.setFields([{name:"fullname",errors:["Họ và tên không hợp lệ"]}])
			return
		}
		// check role
		if(!user.role){
			form.setFields([{name:"role",errors:["Chức vụ không hợp lệ"]}])
			return
		}
		form.validateFields().then(values => {
			dispatch(createUser(user))
			form.resetFields()
			onCancel()
		})
	}
    return (
        <Modal open={visible} title={title} onOk={handle} cancelText={cancelText} onCancel={onCancel}>
			<Form form={form} layout="vertical" onChange={handleChange}>
				<Form.Item name="fullname" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
					<Input name="fullname" />
				</Form.Item>
				<Form.Item name="username" label="Tài khoản" rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}>
					<Input name="username" />
				</Form.Item>
				<Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
					<Input.Password name="password" />
				</Form.Item>
				<Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
					<Input name="phone" />
				</Form.Item>
				<Form.Item name="role" label="Chức vụ"  rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}>
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
