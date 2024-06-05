import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { coverPrice } from "@common/utils/method.util"
const DemoPie = (props) => {

	const data = props?.data || {};
	console.log(data)
	const getByKey = (key) => {
		console.log(key,data[key],data[key]?.length || 0)
		return data[key]?.length || 0;
	};

	const total = ()=>{
		let total = 0;
		Object.keys(data).forEach(key => {
			total += data[key].length || 0;
		})
		return total;
	};
 
  const config = {
    data: [
      { type: 'Giao hàng thành công', value: getByKey('DELIVERED') , },
      { type: 'Đang giao', value: getByKey('CONFIRMED') +getByKey('DELIVERING') +getByKey('PENDING') +getByKey('NOT_CREATED') , },
      { type: 'Hủy đơn', value: getByKey('CANCELED') , },
	  { type: 'Hoàn hàng', value: getByKey('RETURN') +getByKey('RETURNED') ,},
    ],
	autoFit: true,
    angleField: 'value',
    colorField: 'type',
    
    innerRadius: 0.6,
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        
        position: 'right',
       
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: coverPrice().toVND(total()),
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <div style={{padding:"10px",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",background:"#fff"}}>
	{Object.keys(data).length > 0 && <Pie {...config}  />}
  </div>
};

export default DemoPie;
