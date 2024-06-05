import './login.scss';
import { Input,Form,Checkbox,Button } from 'antd';
import { useEffect } from 'react';
import bgLogin from "@assets/bg/login.bg.png"
import { Notification,CatchError,checkTimeExpiredToken } from '@common/utils/method.util'
import userService from '@services/user.service';
import { setAccessToken } from '@common/utils/locaStore.util';
import { useNavigate } from 'react-router-dom';
export default function Login() 
{
	const navigate = useNavigate();
	useEffect(() => {
		document.querySelector("body").style.backgroundImage = `url(${bgLogin})`;
		document.querySelector("body").style.backgroundSize = "cover";
		return () => {
			document.querySelector("body").style.backgroundImage = "";
		}
	});

	useEffect(() => {
		if(localStorage.getItem("access_token") && checkTimeExpiredToken("access_token"))
		{
			userService.getMe().then((res) => {
				setTimeout(() => {
					switch(res.role)
					{
						case "ADMIN":
							navigate("/user");
							break;
						case "SALE":
							navigate("/order");
							break;
						case "SHIP":
							navigate("/ship");
							break;
						default:
							navigate("/order");
							break;
					}
				}, 1000);
			})
		}
	});


	const SignInSuccess = (res) => {
		Notification("success","Đăng nhập thành công").success();
		setAccessToken(res.token);
		switch(res.role)
			{
				case "ADMIN":
					navigate("/user");
					break;
				case "SALE":
					navigate("/order");
					break;
				case "SHIP":
					navigate("/ship");
					break;
				default:
					navigate("/order");
					break;
		}
	}

	const SignIn = async (values) => {
		await userService.login(values.target[0].value,values.target[1].value)
		.then(SignInSuccess)
		.catch(CatchError)
	}
	return (
		<div id="formlogin">
			<Form name='basic' onSubmitCapture={SignIn}  >
				<Form.Item name='username' rules={[{ required: true, message: 'Vui lòng nhập username!' }]}>
					<Input placeholder='Username' size='large' />
				</Form.Item>
				<Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập password!' }]}>
					<Input.Password placeholder='Password' size='large' />
				</Form.Item>
				<Form.Item name="remember" valuePropName="checked" >
					<Checkbox size='large'>Lưu tài khoản</Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit' size='large'> Đăng nhập </Button>
				</Form.Item>
			</Form>
		</div>
	);
}  