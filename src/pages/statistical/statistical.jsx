
import { useDispatch,useSelector } from "react-redux";
import socket from "@common/providers/socket.campaign";
import { useEffect } from "react";
import { dataSelector,accountsSelector,setHistorys } from "@redux/statistical/statistical.slice";
import { Table,Input,Button,Checkbox,Select } from "antd";
import { useState } from "react";
import { toVnd, toVnd2 } from "@common/utils/method.util";
import {ModalViewHistory} from '../../components/statistical/ModalViewHistory';
import {coverNumber} from '../../common/utils/method.util';
export default function Statistical()
{
	const data = useSelector(dataSelector);
	const dispatch = useDispatch();
	const [query,setQuery] = useState({
		search:'',
		account:[],
		isMerge:true
	});
	const [config,setConfig] = useState({
		viewHistory:false
	});
	const accounts = useSelector(accountsSelector);

	const toLabel = (data) => {
		return data.map((item) => {
			return {
				label:item,
				value:item
			}
		})
	}

	useEffect(() => {
		socket.connect();
		dispatch(setHistorys([]));
		socket.emit("getCampaigns",query);
		return () => {
			socket.disconnect();
		}
	},[])


	const OnSelect = (value) => {
		setQuery({...query,account:value})
		socket.emit("getCampaigns",{...query,account:value});
	}

	const OnChange = (e) => {
		setQuery({...query,[e.target.name]:e.target.value})
		socket.emit("getCampaigns",{...query,[e.target.name]:e.target.value});
	}

	const isMergeGroup = (data) => {
		setQuery({...query,isMerge:data})
		socket.emit("getCampaigns",{...query,isMerge:data});
	}

	const Reload = () => {
		socket.emit("getCampaigns",query); 
	}

	const SetHistory = (data) => {
		dispatch(setHistorys(data));
		setConfig({...config,viewHistory:true});
	}


	return (
		<div className="flex flex-col">
			<ModalViewHistory show={config.viewHistory} onClose={() => setConfig({...config,viewHistory:false})} />
			<div className="header flex flex-col">
				<div className="row mt1">
					<div className="w30 mt-1">
						<Input.Search width={"500px"} size="large" name="search" placeholder="Tìm kiếm" onChange={OnChange} />
					</div>
					<div className="w30 mt-1">
							<Button size="large" type="primary"   onClick={Reload}>Làm mới</Button>
					</div>
					<div className="w30 mt-1">
						<Select size="large" mode="multiple" placeholder="Chọn tài khoản" onChange={OnSelect} style={{ width: '100%' }} options={toLabel(accounts)}    />
					</div>
				</div>
				<div className="row  mt-1">
					<div className="w20">
						<Checkbox  size="large" name="group" checked={query.isMerge} onChange={(e)=>isMergeGroup(e.target.checked)}>Gộp chiến dịch cùng tên</Checkbox>
					</div>
				</div>
			</div>
			<div className="content">
				<Table dataSource={data} pagination={false} rowKey={(record,index) => index}  >
					<Table.Column width={200} title="Tên chiến dịch" dataIndex="campaign_name" key="campaign_name" />
					<Table.Column title="Ngân sách" dataIndex="daily_budget" key="daily_budget" align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="Số tiền chi tiêu" dataIndex="spend" key="spend"  align="center"  render={(e) => coverNumber(e)}  />
					<Table.Column title="Lượt hiển thị" dataIndex="impressions" key="impressions"  align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="CPM" dataIndex="cpm" key="cpm"  align="center" render={(e) => toVnd2(e)}  />
					<Table.Column title="Tiếp cận" dataIndex="reach" key="reach"  align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="Kết quả" dataIndex="complete_registration" key="complete_registration"  align="center" render={(e) => coverNumber(e)} />
					<Table.Column title="CTR kết quả" dataIndex="ctr" key="ctr"  align="center" render={(e) => toVnd(e)+"%" } />
					<Table.Column title="Chi phí trên mỗi kết quả" key="cpl" dataIndex="cpl"  align="center"  render={(e) => coverNumber(e)}/>
					<Table.Column title="Chức năng" key="action"  align="center"  render={(text, record,index) => (
						<span>
							<Button type="primary" size="large" onClick={()=> SetHistory(record?.history ?? []) } >Xem</Button>
						</span>
					)} />
				</Table>
			</div>
		</div>
	)
}