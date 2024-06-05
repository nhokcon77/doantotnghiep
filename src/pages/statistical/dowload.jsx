import { DatePicker,Button,notification } from "antd"
import dayjs from 'dayjs';
import {useState} from 'react';
import {toDate} from '@common/utils/method.util';
import {getFromToDate,dowloadFileExcel} from '../../common/utils/method.util';
import reportService from "@services/report.service";
const dateFormat = 'DD/MM/YYYY';

export function Dowload()
{
	const defaultDate = () => {
		// lấy thời gian hiện tại
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1; // getMonth() returns 0-based index
		const fromDate = new Date(`${year}-${month}-01`);
		const toDate = new Date(year, month, 0);
		return { fromDate, toDate };
	  }
	const [config,setConfig] = useState(defaultDate())
	
	  const handleDate = (value) => {
		if(value == null)
		{
			setConfig({...config,fromDate:"",toDate:""})
		}
		else
		{
			setConfig({...config,...getFromToDate(value)})
		}
	}

	const dowloadCamp = () => {
		dowloadFileExcel(`${process.env.REACT_APP_HOST_API}/report/generate-report-camp`,"camp.xlsx")
	}

	const dowloadShiping = () => {
		dowloadFileExcel(`${process.env.REACT_APP_HOST_API}/report/generate-report-bill-of-lading`,"shipping.xlsx")
	}

	const dowloadOrder = () => {
		dowloadFileExcel(`${process.env.REACT_APP_HOST_API}/report/generate-report-telesale`,"order.xlsx")
	}


	return (
		<div className="row">
			<div className="col-md-12">
				<div className="">
					<DatePicker.RangePicker 
					defaultValue={[dayjs(toDate(config.fromDate).toDateDay(), dateFormat), dayjs(toDate(config.toDate).toDateDay(), dateFormat)]} 
					format={(value)=> value.format("DD/MM/YYYY")} size="large" style={{width:"300px"}} name="date"
					onChange={handleDate}
					/>
				</div>
				<div className="mb-2 mt-1">
					<div className="row mt-1">
						<Button type="primary" size="middle" onClick={dowloadCamp} >Tải về báo cáo camp</Button>
					</div>
					<div className="row mt-1">
						<Button type="primary" size="middle" onClick={dowloadShiping} >Tải về báo vận đơn</Button>
					</div>
					<div className="row mt-1">
						<Button type="primary" size="middle" onClick={dowloadOrder}>Tải về báo telesale</Button>
					</div>
				</div>
			</div>
		</div>
	)
}