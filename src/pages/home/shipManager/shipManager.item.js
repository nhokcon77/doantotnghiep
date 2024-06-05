import React from 'react';
import { Typography } from 'antd';
import { toNumFromObj } from '../../../common/utils/method.util';
export const orderStatusFillter = (data) => {
	return [
		{
			value: '',
			label: (
				<Typography.Title style={{ color: '#000000' }} level={5} className="mb-0 paddingtypeOrder">
					Tất cả ({toNumFromObj(data)})
				</Typography.Title>
			),
		},
		{
			value: 'NOT_CREATED',
			label: (
				<Typography.Title style={{ color: '#0000FF' }} level={5} className="mb-0 paddingtypeOrder">
					Chưa tạo đơn ({toNumFromObj(data, 'NOT_CREATED')})
				</Typography.Title>
			),
		},
		{
			value: 'PENDING',
			label: (
				<Typography.Title style={{ color: '#CCCC00' }} level={5} className="mb-0 paddingtypeOrder">
					Chờ lấy hàng ({toNumFromObj(data, 'PENDING')})
				</Typography.Title>
			),
		},
		{
			value: 'CONFIRMED',
			label: (
				<Typography.Title style={{ color: '#00FF00' }} level={5} className="mb-0 paddingtypeOrder">
					Đã lấy hàng ({toNumFromObj(data, 'CONFIRMED')})
				</Typography.Title>
			),
		},
		{
			value: 'DELIVERING',
			label: (
				<Typography.Title style={{ color: '#FFA500' }} level={5} className="mb-0 paddingtypeOrder">
					Đang giao hàng ({toNumFromObj(data, 'DELIVERING')})
				</Typography.Title>
			),
		},
		{
			value: 'DELIVERED',
			label: (
				<Typography.Title style={{ color: '#00008B' }} level={5} className="mb-0 paddingtypeOrder">
					Đã giao hàng ({toNumFromObj(data, 'DELIVERED')})
				</Typography.Title>
			),
		},
		{
			value: 'CANCELED',
			label: (
				<Typography.Title style={{ color: '#FF0000' }} level={5} className="mb-0 paddingtypeOrder">
					Đã hủy ({toNumFromObj(data, 'CANCELED')})
				</Typography.Title>
			),
		},
		{
			value: 'RETURN',
			label: (
				<Typography.Title style={{ color: '#800080' }} level={5} className="mb-0 paddingtypeOrder">
					Đang hoàn hàng ({toNumFromObj(data, 'RETURN')})
				</Typography.Title>
			),
		},
		{
			value: 'RETURNED',
			label: (
				<Typography.Title style={{ color: '#008000' }} level={5} className="mb-0 paddingtypeOrder">
					Đã hoàn hàng ({toNumFromObj(data, 'RETURNED')})
				</Typography.Title>
			),
		},
	];
};
