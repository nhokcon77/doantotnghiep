import { FaUserFriends, FaWarehouse, FaShippingFast } from 'react-icons/fa';
import { GrSettingsOption } from 'react-icons/gr';
import { FcStatistics } from 'react-icons/fc';
import { ImCart } from 'react-icons/im';

const MenuItems = [
	{
		key: 'user',
		icon: <FaUserFriends size={20} />,
		label: 'Quản lý user',
		role: ['ADMIN'],
	},
	{
		key: 'warehouse',
		icon: <FaWarehouse size={20} />,
		label: 'Quản lý kho',
		role: ['ADMIN', 'SHIP', 'LEADER'],
	},
	{
		key: 'order',
		icon: <ImCart size={20} />,
		label: 'Quản lý đơn hàng',
		role: ['SALE', 'ADMIN', 'LEADER'],
	},
	{
		key: 'ship',
		icon: <FaShippingFast size={20} />,
		label: 'Vận chuyển',
		role: ['SHIP', 'ADMIN', 'LEADER'],
	},
	{
		key: 'statistics',
		icon: <FcStatistics size={20} />,
		label: 'Báo cáo chiến dịch',
		role: ['ADMIN', 'LEADER'],
	},
	{
		key: 'setting',
		icon: <GrSettingsOption size={20} />,
		label: 'Cấu hình hệ thống',
		role: ['ADMIN', 'LEADER'],
	},
	{
		key: 'baocaothongke',
		icon: <GrSettingsOption size={20} />,
		label: 'Thống kê',
		role: ['ADMIN', 'LEADER'],
	},
	// {
	// 	key: 'report',
	// 	icon: <HiDocumentReport size={20} />,
	// 	label: 'Báo cáo',
	// 	role: ['ADMIN', 'LEADER'],
	// },
];

const FilterItems = (role) => {
	return MenuItems.filter((item) => item.role.includes(role));
};
export default FilterItems;
