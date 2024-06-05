import React from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = (props) => {

	const data = props?.data || [];

	const getByKey = (key) => {
		return data?.find(item => item._id === key)?.count || 0;
	}

  const config = {
    data: [
      { type: 'Chờ xác nhận', value: getByKey("PENDING") , title:"Chờ xác nhận"},
      { type: 'Tỉ lệ xác nhận', value: getByKey("CONFIRM") , title:"Tỉ lệ xác nhận"},
      { type: 'Tỉ lệ hủy', value: getByKey("NOT_CONTACT")+getByKey("CANCEL")+getByKey("PHONE_DESTROY") , title:"Tỉ lệ hủy"},
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
          text: (getByKey("NOT_CONTACT")+getByKey("CANCEL")+getByKey("PHONE_DESTROY")+getByKey("CONFIRM")+getByKey("PENDING")).toString(),
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
  };
  return <div style={{background:"#FFF",padding:"10px",borderRadius:"15px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
	<Pie {...config}  />
  </div>
};

export default DemoPie;
