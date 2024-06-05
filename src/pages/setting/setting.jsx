import  DefaultLayout  from "@common/layouts/default.layout";
import { Form,Input,Button, } from "antd";
import { useDispatch,useSelector } from "react-redux";
import { SettingSelector } from "@redux/setting/setting.slice";
import { useEffect } from "react";
import { getSetting,updateSetting } from "@redux/setting/setting.thunk";
import { Notification } from "@common/utils/method.util";
export default function Setting()
{
	const dispatch = useDispatch();
	const [form] = Form.useForm()
	const setting = useSelector(SettingSelector);

	useEffect(() => {
		dispatch(getSetting());
	})

	useEffect(() => {
		form.setFieldsValue(setting);
	},[setting])


	const onFinish = () => {
		form.validateFields().then((values) => 
		{
			Notification("Cập nhật thành công").success();
			dispatch(updateSetting(values));
		})
	}

	return (
		<DefaultLayout name="Cấu hình" path={"setting"}>
			<div id="formSetting">
				{/* { tạo form có 3 trường là client_id , client_secret , fb_exchange_token} */}
				<Form form={form} layout="vertical"  onSubmitCapture={onFinish} >
					<Form.Item label="Client ID" name={"client_id"}  rules={[{required:true,message:"Vui lòng điền Client ID"}]}  >
						{/* { tạo input nhập client_id} */}
						<Input />
					</Form.Item>
					<Form.Item label="Client Secret" name={"client_secret"} rules={[{required:true,message:"Vui lòng điền Client Secret"}]} >
						{/* { tạo input nhập client_secret} */}
						<Input />
					</Form.Item>
					<Form.Item label="FB Exchange Token" name={"fb_exchange_token"} rules={[{required:true,message:"Vui lòng điền FB Exchange Token"}]} >
						{/* { tạo input nhập fb_exchange_token} */}
						<Input.TextArea />
					</Form.Item>
					<Form.Item>
						{/* { tạo button submit} */}
						<Button type="primary" htmlType='submit'>Lưu</Button>
					</Form.Item>
				</Form>
			</div>
		</DefaultLayout>
	)
}