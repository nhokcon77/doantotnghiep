import { createSlice } from '@reduxjs/toolkit';
import { getData } from './statistical.thunk';
import { CatchError } from '@common/utils/method.util';
export const StatisticsSlice = createSlice({
	name: 'statistics',
	initialState: {
		data: [],
		data2: [],
		accounts: [],
		historys: [],
	},
	reducers: {
		setData: (state, action) => {
			state.data = action.payload;
		},
		setData2: (state, action) => {
			state.data2 = action.payload;
		},
		setAccounts: (state, action) => {
			state.accounts = action.payload;
		},
		setHistorys: (state, action) => {
			state.historys = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getData.fulfilled, (state, action) => {
				state.data2 = action.payload;
			})
			.addCase(getData.rejected, (state, action) => {
				CatchError(action.payload);
				state.data2 = [];
			});
	},
});

// Action creators are generated for each case reducer function
export const { setData, setData2, setAccounts, setHistorys } = StatisticsSlice.actions;
export const dataSelector = (state) => state.statistics.data;
export const data2Selector = (state) => state.statistics.data2;
export const accountsSelector = (state) => state.statistics.accounts;
export const historysSelector = (state) => state.statistics.historys;
// selectors
export default StatisticsSlice.reducer;
