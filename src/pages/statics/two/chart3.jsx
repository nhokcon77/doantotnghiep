import { Line } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const DemoLine = (props) => {
	const data = props.data != undefined ? props.data
	.map((item) => {
		return {
			_id: item._id+1,
			count: item.count,
		};
	})
	.sort((a,b)=>a._id-b._id) : [];
//   const data = [
//     { year: '1', value: 3 },
//     { year: '2', value: 4 },
//     { year: '3', value: 3.5 },
//     { year: '4', value: 5 },
//     { year: '5', value: 4.9 },
//     { year: '6', value: 6 },
//     { year: '7', value: 7 },
//     { year: '8', value: 9 },
//     { year: '9', value: 13 },
// 	{ year: '10', value: 13 },
// 	{ year: '11', value: 13 },
// 	{ year: '12', value: 13 },
// 	{ year: '13', value: 13 },
// 	{ year: '14', value: 13 },
// 	{ year: '15', value: 13 },
// 	{ year: '16', value: 13 },
// 	{ year: '17', value: 13 },
// 	{ year: '18', value: 13 },
// 	{ year: '19', value: 13 },
// 	{ year: '20', value: 13 },
// 	{ year: '21', value: 13 },
// 	{ year: '22', value: 13 },
// 	{ year: '23', value: 13 },
// 	{ year: '24', value: 13 },
//   ];

	

  const config = {
    data,
    xField: '_id',
    yField: 'count',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <div style={{background:"#fff",borderRadius:"15px",padding:"10px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
	<Line {...config} />;
  </div>
};

export default DemoLine;
