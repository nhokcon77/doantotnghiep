import React,{useState,useEffect} from 'react';
import { Button, Col, DatePicker,Radio } from "antd";
import {  toDate } from "@common/utils/method.util"
import { IoReload } from "react-icons/io5";
import dayjs from 'dayjs';
import { RiFileExcel2Line } from "react-icons/ri";
import Chart1 from './chart1';
import Chart2 from './chart2';
import Chart3 from './chart3';
import { Row  } from 'antd';
import { coverPrice } from "@common/utils/method.util"
import newReport from '@services/newReport.service';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
export default function Two()
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
	  const [dataQuery,setDate] = useState(defaultDate())
	  const [data,setData] = useState({})


	  useEffect(() => {
		const fetchData = async () => {
		  const res = await newReport.reportOrder({ dayStart: moment(dataQuery.fromDate).format(dateFormat), dayEnd: moment(dataQuery.toDate).format(dateFormat) });
		  setData(res);
		}
		console.log(dataQuery)
		if (dataQuery.fromDate && dataQuery.toDate) {
		  fetchData();
		}
	  }, [dataQuery])
	return (
		<div className="mb-3">
			<div className="item flex" style={{alignItems:"center",gap:10,flexDirection:"row-reverse",justifyContent:"end"}}>
				<DatePicker.RangePicker 
				defaultValue={[dayjs(toDate(dataQuery.fromDate).toDateInput(), dateFormat), dayjs(toDate(dataQuery.toDate).toDateInput(), dateFormat)]} 
				format={(value)=> value.format(dateFormat)} size="large" style={{width:"300px"}} name="date"
				onChange={(_,e)=>{
					if(e &&  e.length>0)
					{
						setDate({fromDate:e[0],toDate:e[1]})
					}
				}}
				/>
				<div className='flex' style={{gap:10}}>
					<Button type='primary'>
						<RiFileExcel2Line size={20}/>
					</Button>
					<Button type='primary'>
						<IoReload size={20}/>
					</Button>
				</div>
			</div>
			<Row gutter={[32,32]} style={{marginTop:"15px"}}>
				<Col span={24}>
					<Chart1 data={data.groupByStatus}/>
				</Col>
				<Col span={12}>
					<Chart2 data={data.groupByStatus} />
				</Col>
				<Col span={12}>
					<Chart3  data={data.groupByStatus}/>
				</Col>
			</Row>
		</div>
	)
}