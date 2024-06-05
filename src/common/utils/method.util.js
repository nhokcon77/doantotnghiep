import { notification,Alert, Avatar ,Tag } from 'antd';
import profile from "@assets/icon/profile.png"
export const onlyFullHD = () => {
	const execute = () => {
		const body = document.querySelector('body');
		const wWidth = window.innerWidth;
		const wHeight = window.innerHeight;
		const bWidth = 1600;
		const scaleUp = (1 / wWidth) * bWidth;
		const scaleDown = (1 / bWidth) * wWidth;

		body.style.width = `${bWidth}px`;
		body.style.height = `${wHeight * scaleUp}px`;
		body.style.transform = `scale(${scaleDown})`;
	};
	window.onresize = () => execute();
	execute();
};

export const Notification = (text, title) => {
	return {
		success: () => {
			notification.success({
				message: title || 'Thành công',
				description: text,
				duration: 2,
			});
		},
		error: () => {
			notification.error({
				message: title || 'Thất bại',
				description: text,
				duration: 2,
			});
		},
		warning: () => {
			notification.warning({
				message: title || 'Cảnh báo',
				description: text,
				duration: 2,
			});
		},
		info: () => {
			notification.info({
				message: title || 'Thông báo',
				description: text,
				duration: 2,
			});
		},
	};
};

export function CatchError(error) {
	if (error?.CODE && error?.MESSAGE) {
		notification.error({
			message: error.CODE,
			description: error.MESSAGE,
			duration: 2,
		});
	} else {
		notification.error({
			message: 'Lỗi',
			description: error?.toString() || 'Lỗi không xác định',
			duration: 2,
		});
	}
}

export const getPathStaticFileServer = (path) => {
	return `${process.env.REACT_APP_HOST_API}/public/${path}`;
};

export const removeChar = (str, char) => {
	str = str.toString();
	while (str.indexOf(char) !== -1) {
		str = str.replace(char, '');
	}
	return str;
};

export function coverNumber(num) {
	if(!num) return 0;
	function formatNumber(num) {
		var str = num?.toString().split('.');
		if ((str[0]?.length || 0) >= 4) {
			str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
		}
		if (str[1] && (str[1]?.length || 0) >= 4) {
			str[1] = str[1].replace(/(\d{3})/g, '$1 ');
		}
		return str.join(',');
	}
	return formatNumber(num);
}

export function coverPrice() {
	var formatter = new Intl.NumberFormat();
	const priceParser = (value) => {
		return value ? parseInt(removeChar(value, '.'), 10) : 0;
	};
	const priceFormatter = (value) => {
		let val = formatter.format(priceParser(value), 10);
		while (val.indexOf(',') !== -1) {
			val = val.replace(',', '.');
		}
		return val;
	};

	return {
		toVND: priceFormatter,
		toNumber: priceParser,
	};
}

export function toVnd(price) {
	var formatter = new Intl.NumberFormat();
	return formatter.format(price?.toFixed(2) || 0, 10).replace(',', '.');
}
export function toVnd2(price) {
	if (price.toString().includes('')) {
		price = parseInt(price.toString().split('.')[0], 10);
	}

	var formatter = new Intl.NumberFormat();
	return formatter.format(price?.toFixed(3) || 0, 10).replace(',', '.');
}
export function padLeft(str, char, length) {
	return (new Array(length).join(char) + str).slice(-length);
}

export function toDate(date) {
	if (!date) {
		date = new Date();
	}
	date = new Date(date);
	return {
		toDateTimeDay() {
			// cover datae to format hh:mm:ss dd/mm/yyyy
			const d = new Date(date);
			const day = padLeft(d.getDate(), '0', 2);
			const month = padLeft(d.getMonth() + 1, '0', 2);
			const year = d.getFullYear();
			const hour = padLeft(d.getHours(), '0', 2);
			const minute = padLeft(d.getMinutes(), '0', 2);
			const second = padLeft(d.getSeconds(), '0', 2);
			return `${hour}:${minute}:${second} ${day}/${month}/${year}`;
		},
		// to dd/mm/yyyy
		toDateDay() {
			const d = new Date(date);
			const day = padLeft(d.getDate(), '0', 2);
			const month = padLeft(d.getMonth() + 1, '0', 2);
			const year = d.getFullYear();
			return `${day}/${month}/${year}`;
		},
		// to yyyy-mm-dd
		toDateInput() {
			const d = new Date(date);
			const day = padLeft(d.getDate(), '0', 2);
			const month = padLeft(d.getMonth() + 1, '0', 2);
			const year = d.getFullYear();
			return `${year}-${month}-${day}`;
		},
	};
}

export function toNumFromObj(obj, key) {
	if (!obj) return 0;
	if (key) {
		return obj[key] || 0;
	}
	let i = 0;
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			i += obj[key];
		}
	}
	return i;
}

export function getFromDate(date, keys) {
	let from, to;
	try {
		from = new Date(date[0]?.$d || new Date());
		to = new Date(date[1]?.$d || new Date());
	} catch (e) {
		from = new Date();
		to = new Date();
	}
	return {
		fromDate: from.getTime(),
		toDate: to.getTime(),
	};
}

export function getFromToDate(date) {
	let from, to;
	try {
		from = new Date(date[0]?.$d || new Date());
		to = new Date(date[1]?.$d || new Date());
	} catch (e) {
		from = new Date();
		to = new Date();
	}
	// format date to yyyy-mm-dd
	function formatDate(date) {
		return `${date.getFullYear()}-${padLeft(date.getMonth() + 1, '0', 2)}-${padLeft(date.getDate() + 1, '0', 2)}`;
	}
	return {
		dateStart: formatDate(from),
		dateEnd: formatDate(to),
	};
}

export function ToLinkProduct(item, index) {
	if (item.includes('https://')) {
		if (item.includes('?')) {
			item = item.split('?')[0];
		}
		return (
			<div key={index} className="flex">
				<h4>Link sản phẩm : </h4>
				<a target="_blank" without="true" rel="noreferrer" href={item}>
					{item}
				</a>
			</div>
		);
	}
	return <div key={index}>{item}</div>;
}

export function checkTimeExpiredToken(key) {
	var token = localStorage.getItem(key);
	if (!token) return false;
	var json = JSON.parse(atob(token.split('.')[1]));
	var now = new Date().getTime();
	if (json.exp * 1000 < now) return false;
	return true;
}

export function handlePrint(data, name) {
	let url = '';
	if (name.includes('.pdf')) {
		url = `${process.env.REACT_APP_HOST_API}/public/order/${name}`;
	} else {
		url = `${process.env.REACT_APP_HOST_API}/public/order/${name}.pdf`;
	}
	const newTab = window.open(url, '_blank');
	newTab.onload = () => {
		newTab.print();
	};
}

export function dowloadFileExcel(links, name) {
	const link = document.createElement('a');
	link.href = links;
	link.download = name;
	link.click();
}

export function statusTimeLine(status) {
	switch (status) {
		case -1:
			return 'Hủy đơn';
		case 0:
			return 'Khởi tạo';
		case 1:
			return 'Chưa tiếp nhận';
		case 2:
			return 'Đã tiếp nhận';
		case 3:
			return 'Đang lấy hàng';
		case 4:
			return 'Đang giao hàng';
		case 5:
			return 'Đã giao hàng';
		case 6:
			return 'Đã đối soát';
		case 7:
			return 'Không lấy được hàng';
		case 8:
			return 'Hoảng lấy hàng';
		case 9:
			return 'Không giao được hàng';
		case 10:
			return 'Delay giao hàng';
		case 11:
			return 'Đã đối soát ';
		case 12:
			return 'Đã điều phối lấy hàng';
		case 13:
			return 'Đơn hàng bồi hoàn';
		case 20:
			return 'Đang trả hàng';
		case 21:
			return 'Đã trả hàng';
		case 45:
			return 'Shipper đã giao hàng';
		case 49:
			return 'Shipper không giao được hàng';
		case 123:
			return 'Shipper đã lấy hàng';
		case 127:
			return 'Shipper không lấy được hàng';
		case 128:
			return 'Shipper delay lấy hàng';
		case 410:
			return 'Shipper delay giao hàng';
		default:
			return 'Không xác định';
	}
}

// tạo cho tôi hàm lấy ngày tháng năm của ngày mai
export function getTomorrow() {
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	return tomorrow;
}

export function toStatusOrder(status) {
	switch (status) {
		case 'NOT_CREATED':
			return 'Chưa tạo đơn';
		case 'PENDING':
			return 'Chờ lấy hàng';
		case 'CONFIRMED':
			return 'Đã lấy hàng';
		case 'DELIVERING':
			return 'Đang giao hàng';
		case 'DELIVERED':
			return 'Đã giao hàng';
		case 'CANCELED':
			return 'Đã hủy';
		case 'RETURN':
			return 'Đang trả hàng';
		default:
			return 'Đã trả hàng';
	}
}

export function toStatusOrderColor(status) {
	switch (status) {
		case 'NOT_CREATED':
			return '#0000FF';
		case 'PENDING':
			return '#CCCC00';
		case 'CONFIRMED':
			return '#00FF00';
		case 'DELIVERING':
			return '#FFA500';
		case 'DELIVERED':
			return '#00008B';
		case 'CANCELED':
			return '#FF0000';
		case 'RETURN':
			return '#800080';
		default:
			return '#008000';
	}
}

export function toTypeOrder(type) {
	switch (type) {
		case 'PENDING':
			return 'Chờ xác nhận';
		case 'CONFIRM':
			return 'Đã xác nhận';
		case 'NOT_CONTACT':
			return 'Không liên lạc được';
		case 'PHONE_DESTROY':
			return 'Số phá hoại';
		case 'PHONE_DUPLICATE':
			return 'Số trùng';
		case 'NO_PRODUCT':
			return 'Không có hàng';
		case 'ORDER_TO_SHIP':
			return 'Đơn đi';
		default:
			return 'Hủy đơn';
	}
}

export function toTypeOrderColor(type) {
	switch (type) {
		case 'PENDING':
			return '#CCCC00';
		case 'CONFIRM':
			return '#008000';
		case 'NOT_CONTACT':
			return '#808080';
		case 'PHONE_DESTROY':
			return '#FF0000';
		case 'PHONE_DUPLICATE':
			return '#FFA500';
		case 'ORDER_TO_SHIP':
			return '#00FF00';
		default:
			return '#FF0000';
	}
}


export function toEventNoti(noti)
{
	switch (noti?.event) {
		case 'CREATE':
			return <Tag color="green">Tạo mới</Tag>;
		case 'UPDATE':
			return <Tag color="blue">Cập nhật</Tag>;
		case 'DELETE':
			return <Tag color="red">Xóa</Tag>;
		default:
			return <Tag color="red">Không xác định</Tag>;
	}
}

export function toTypeNoti(noti)
{
	switch (noti?.type) {
		case 'ORDER':
			return 'Đơn hàng';
		case 'PRODUCT':
			return <Tag color="orange">Sản phẩm</Tag>;
		case 'USER':
			return 'Người dùng';
		default:
			return 'Không xác định';
	}
}

export function ReadDiscription(noti)
{
	if(noti?.data && noti?.data?.length > 0)
	{
		const product = noti?.data[0];
		return product?.name ?? "Không xác định";
	}
	return <span>Không xác định</span>
}



export function renderDiscription(noti)
{
	switch (noti?.type) {
		case 'PRODUCT':
			return <div style={{display:"flex",flexDirection:"column"}}>
				<span >{toEventNoti(noti)} {toTypeNoti(noti)}</span>
				<span style={{wordWrap:"break-word"}}>{ReadDiscription(noti)}</span>
			</div>
		default:
			return <span></span>;
	}
}



export function RenderAvatarNoti(noti)
{
	if(noti?.repairer && noti?.repairer?.avatar)
	{
		return <Avatar src={getPathStaticFileServer(noti?.repairer?.avatar)} />
	}
	return <Avatar src={profile} />
}

export function RenderName(noti)
{
	if(noti?.repairer)
	{
		return <span>{noti?.repairer?.username} - {noti?.repairer?.fullname}</span>
	}
	return <span>{noti.userAction}</span>
}

