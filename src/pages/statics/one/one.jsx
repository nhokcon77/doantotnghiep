import React,{useState,useEffect} from 'react';
import { Button, Col, DatePicker,Modal,Radio,Row, Typography } from "antd";
import {  toDate } from "@common/utils/method.util"
import { IoReload } from "react-icons/io5";
import dayjs from 'dayjs';
import Chart1 from './chart1';
import Chart2 from './chart2';
import { RiFileExcel2Line } from "react-icons/ri";
import { coverPrice } from "@common/utils/method.util"
import newReport from '@services/newReport.service';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
export default function One()
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
	  const [data1,setData1] = useState([])
	  const [configModal,setConfigModal] = useState({open:false})

	  const toggleModal = ()=>{
		  setConfigModal({...configModal,open:!configModal.open})
	  }



	  useEffect(() => {
		const fetchData = async () => {
		  const res = await newReport.reportOrder({ dayStart: moment(dataQuery.fromDate).format(dateFormat), dayEnd: moment(dataQuery.toDate).format(dateFormat) });
		  setData(res);
		}
		const fetchData1 = async () => {
			const res = await newReport.reportProduct({ dayStart: moment(dataQuery.fromDate).format(dateFormat), dayEnd: moment(dataQuery.toDate).format(dateFormat) });
			setData1(res);
		}
		if (dataQuery.fromDate && dataQuery.toDate) {
		  fetchData();
		  fetchData1();
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
			{
				configModal.open && <Modal width={1080} onCancel={toggleModal} open={configModal.open} >
					<Chart2 data={data1}/>
				</Modal>
			}
			<Row gutter={[32,32]} style={{marginTop:"15px"}}>
				<Col span={24}>
					<Chart1 data={data.groupByStatus} />
				</Col>
				<Col span={24}>
					<Chart2 data={data1}/>
				</Col>
				<Col span={24}>
					<Button block onClick={toggleModal}  type='primary'>
						<Typography.Text strong style={{color:"#fff"}}>
							Xem thêm
						</Typography.Text>
					</Button>
				</Col>
			</Row>
		</div>
	)
}