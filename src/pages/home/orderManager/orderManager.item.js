import React from 'react';
import { Typography } from 'antd';
import { toNumFromObj } from '../../../common/utils/method.util';
export const orderTypeFillter = (data) => {
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
			value: 'PENDING',
			label: (
				<Typography.Title style={{ color: '#CCCC00' }} level={5} className="mb-0 paddingtypeOrder">
					Chờ xác nhận ({toNumFromObj(data, 'PENDING')})
				</Typography.Title>
			),
		},
		{
			value: 'CONFIRM',
			label: (
				<Typography.Title style={{ color: '#008000' }} level={5} className="mb-0 paddingtypeOrder">
					Đã xác nhận ({toNumFromObj(data, 'CONFIRM')})
				</Typography.Title>
			),
		},
		{
			value: 'NOT_CONTACT',
			label: (
				<Typography.Title style={{ color: '#808080' }} level={5} className="mb-0 paddingtypeOrder">
					Không liên lạc được ({toNumFromObj(data, 'NOT_CONTACT')})
				</Typography.Title>
			),
		},
		{
			value: 'PHONE_DUPLICATE',
			label: (
				<Typography.Title style={{ color: '#FFA500' }} level={5} className="mb-0 paddingtypeOrder">
					Số trùng ({toNumFromObj(data, 'PHONE_DUPLICATE')})
				</Typography.Title>
			),
		},
		{
			value: 'PHONE_DESTROY',
			label: (
				<Typography.Title style={{ color: '#FF0000' }} level={5} className="mb-0 paddingtypeOrder">
					Số phá hoại ({toNumFromObj(data, 'PHONE_DESTROY')})
				</Typography.Title>
			),
		},
		{
			value: 'NO_PRODUCT',
			label: (
				<Typography.Title style={{ color: '#FF0000' }} level={5} className="mb-0 paddingtypeOrder">
					Không có hàng ({toNumFromObj(data, 'NO_PRODUCT')})
				</Typography.Title>
			),
		},
		{
			value: 'CANCEL',
			label: (
				<Typography.Title style={{ color: '#FF0000' }} level={5} className="mb-0 paddingtypeOrder">
					Hủy đơn ({toNumFromObj(data, 'CANCEL')})
				</Typography.Title>
			),
		},
		{
			value: 'ORDER_TO_SHIP',
			label: (
				<Typography.Title style={{ color: '#00FF00' }} level={5} className="mb-0 paddingtypeOrder">
					Đơn đi ({toNumFromObj(data, 'ORDER_TO_SHIP')})
				</Typography.Title>
			),
		}

	];
};
