import React,{useEffect, useState} from 'react';
import { Button, DatePicker,Radio } from "antd";
import {  toDate } from "@common/utils/method.util"
import { IoReload } from "react-icons/io5";
import dayjs from 'dayjs';
import { RiFileExcel2Line } from "react-icons/ri";
import DemoPie from './chart1';
import Chart2 from './chart2';
import DemoLine from './chart3';
import { Row,Col } from 'antd';
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




	const [config,setConfig] = useState(defaultDate())
	return (
		<div className="mb-3">
			<div className="item flex" style={{alignItems:"center",gap:10,flexDirection:"row-reverse",justifyContent:"end"}}>
				<DatePicker.RangePicker 
				defaultValue={[dayjs(toDate(config.fromDate).toDateInput(), dateFormat), dayjs(toDate(config.toDate).toDateInput(), dateFormat)]} 
				format={(value)=> value.format(dateFormat)} size="large" style={{width:"300px"}} name="date"
				// eslint-disable-next-line no-undef
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
				<Col span={12}>
					<DemoPie data={data?.groupByType}/>
				</Col>
				<Col span={12}>
					<Chart2 data={data?.groupByType}/>
				</Col>
				<Col span={24}>
					<DemoLine  data={data?.groupByHour || []}  />
				</Col>
			</Row>
		</div>
	)
}