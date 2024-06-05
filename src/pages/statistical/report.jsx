import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import {data2Selector} from '../../redux/statistical/statistical.slice';
import { getData,update } from "@redux/statistical/statistical.thunk";
import { Table,Select,InputNumber,DatePicker,Radio } from "antd";
import {coverPrice} from '@common/utils/method.util';
import dayjs from 'dayjs';
import { toDate } from "@common/utils/method.util";
import {getFromToDate, coverNumber} from '../../common/utils/method.util';
const dateFormat = 'DD/MM/YYYY';
export function Report()
{
	const dispatch = useDispatch();
	const data = useSelector(data2Selector);
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


	
	  


	useEffect(() => {
		dispatch(getData(config));
	},[config])

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


	const onSelect = (key,val,id) => {
		dispatch(update({...config,[key]:val,id,"stageTest":val}));
	}

	const onChange = (e) => {
		const {id,value,name} = e.target;
		dispatch(update({...config,[name]:coverPrice().toNumber(value),id}));
	}


	const toStatus = (entity) => {
		return(
			<Select value={entity.stageTest}  style={{minWidth:"200px"}}   onChange={(val)=>onSelect("stageTest",val,entity?.id)} >
				<Select.Option value="WIN_MAIN_RUN">SP win chạy chính</Select.Option>
				<Select.Option value="CAMP_STOP">Camp đã dừng</Select.Option>
				<Select.Option value="STATES_1">Giai đoạn 1</Select.Option>
			</Select>
		)
	}

	const toInputNumber = (entity) => {
		return(
			<InputNumber 
				id={entity.id} 
				name="alowbleConverSionPrice" 
				value={entity.alowbleConverSionPrice} 
				style={{width:"100%"}}  
				onBlur={onChange}
				formatter={coverPrice().toVND} 
				parser={coverPrice().toNumber}
			/>
		)
	}
	
	const handleRadioChange = (e) => {
		const { value } = e.target; 
		setConfig({
			stageTest:value,
			stageTest2:value,
		})
	}

	return (
		<div>
			<div className="mb-3">
				<div className="item">
					<DatePicker.RangePicker 
					defaultValue={[dayjs(toDate(config.fromDate).toDateDay(), dateFormat), dayjs(toDate(config.toDate).toDateDay(), dateFormat)]} 
					format={(value)=> value.format("DD/MM/YYYY")} size="large" style={{width:"300px"}} name="date"
					onChange={handleDate}
					/>
				</div>
				<div className="mb-2 mt-1">
					<Radio.Group defaultValue={""} onChange={handleRadioChange} >
						<Radio.Button value="">Tất cả</Radio.Button>
						<Radio.Button value="WIN_MAIN_RUN">SP WIN</Radio.Button>
						<Radio.Button value="STATES_1">TEST</Radio.Button>
						<Radio.Button value="CAMP_STOP">STOP</Radio.Button>
					</Radio.Group>
				</div>
			</div>
			<Table dataSource={data} >
				<Table.Column title="STT" align="center" render={(val,record,index)=> index+1} />
				<Table.Column title="Sản phẩm" dataIndex={"campName"} />
				<Table.Column title="Ngân sách chạy" align="center" dataIndex={"budget"} render={(val,record,index)=> coverPrice().toVND(record.budget)}  />
				<Table.Column title="Tổng chuyển đổi" align="center" dataIndex={"totalConversion"}  />
				<Table.Column title="Tổng chi phí quảng cáo chạy" align="center" dataIndex={"spend"} render={(val,record,index)=> coverPrice().toVND(record.spend)}  />
				<Table.Column title="giá chuyển đổi thực tế" align="center" dataIndex={"actualConversionPrice"} render={(val,record,index)=> 
					{
						if(record.totalConversion === 0)
						{
							return `${coverNumber(record.spend)}`;
						}
						return `${coverNumber(record.actualConversionPrice)}`;
					}
					}  />
				<Table.Column title="giá chuyển đổi cho phép" align="center" dataIndex={"alowbleConverSionPrice"}  render={(val,record,index)=> toInputNumber(record)}  />
				<Table.Column title="Chên lệch" align="center" dataIndex={"rateDifference"}  render={(val,record,index)=> parseInt(record.rateDifference).toFixed(2)+"%"}  />
				<Table.Column title="Giai đoạn" align="center"  width={200} dataIndex={"stageTest"} render={(val,record,index)=> toStatus(record)}  />
				<Table.Column title="Số cuộc gọi thành công" align="center" dataIndex={"callSuccess"} />
				<Table.Column title="Tỉ lệ chốt" align="center" dataIndex={"closingRate"} render={(val,record,index)=> parseInt(record.closingRate).toFixed(2)+"%"} />
			</Table>
		</div>
	)
}