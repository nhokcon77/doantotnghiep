import MapJson from '@assets/json/map.json';
let province = {};
let district = {};
let ward = {};

let provinceNames = [];
let districtNames = [];
let wardNames = [];

MapJson.data.forEach((item) => {
	province[item.level1_id] = item.name;
	provinceNames.push(item.name);
	item.level2s.forEach((item) => {
		district[item.level2_id] = item.name;
		districtNames.push(item.name);
		item.level3s.forEach((item) => {
			ward[item.level3_id] = item.name;
			wardNames.push(item.name);
		});
	});
});

export const MapInfo = {
	province: (id) => {
		return province[id];
	},
	district: (id) => {
		return district[id];
	},
	ward: (id) => {
		return ward[id];
	},
	checkProvince: (name) => {
		return provinceNames.includes(name.trim());
	},
	checkDistrict: (name) => {
		return districtNames.includes(name);
	},
	checkWard: (name) => {
		return wardNames.includes(name);
	},
};

//province
export const getPronvice = () => {
	return Array.from(MapJson.data).map((item) => {
		return {
			value: item.name,
			label: item.name,
			data: item.level1_id,
		};
	});
};

//district
export const getDistrict = (provinceId) => {
	return Array.from(MapJson.data.find((item) => item.level1_id === provinceId).level2s).map((item) => {
		return {
			value: item.name,
			label: item.name,
			data: item.level2_id,
		};
	});
};

//ward
export const getWard = (provinceId, districtId) => {
	return Array.from(MapJson.data.find((item) => item.level1_id === provinceId).level2s.find((item) => item.level2_id === districtId).level3s).map((item) => {
		return {
			value: item.name,
			label: item.name,
			data: item.level3_id,
		};
	});
};

export function getInfo() {
	return {
		getNameProvince: (provinceId) => {
			return MapJson.data.find((item) => item.level1_id === provinceId)?.name;
		},
		getNameDistrict: (provinceId, districtId) => {
			try{
				return MapJson.data.find((item) => item.level1_id === provinceId).level2s?.find((item) => item?.level2_id === districtId)?.name;
			}
			catch
			{
				return '';
			}
		},
		getNameWard: (provinceId, districtId, wardId) => {
			try{
				return MapJson.data
				.find((item) => item.level1_id === provinceId)
				.level2s.find((item) => item.level2_id === districtId)
				.level3s.find((item) => item.level3_id === wardId).name;
			}
			catch
			{
				return '';
			}
		},
	};
}
