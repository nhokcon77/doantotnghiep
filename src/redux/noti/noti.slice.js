import { createSlice } from '@reduxjs/toolkit';
import { CatchError } from '@common/utils/method.util';
export const StatisticsSlice = createSlice({
	name: 'noti',
	initialState: {
		data: [],
		select: false,
		unread: 0,
	},
	reducers: {
		pushNotification: (state, action) => {
			if(state.select)
			{
				state.unread = 0;
			}
			else
			{
				state.unread += 1;
			}
			state.data = [action.payload, ...state.data];
		},
		setSelect: (state, action) => {
			state.select = action.payload;
		},
		setUnread: (state, action) => {
			state.unread = action.payload;
		},
		setNotis: (state, action) => {
			state.data = action.payload;
		},
		setNotisOld: (state, action) => {
			state.data = [...state.data, ...action.payload]
		}
	},
});

// Action creators are generated for each case reducer function
export const { pushNotification, setSelect, setUnread, setNotis,setNotisOld } = StatisticsSlice.actions;
export const getNotis = (state) => state.noti.data;
export const getNoti = (state) => state.noti.select;
export const getUnread = (state) => state.noti?.unread;
// selectors
export default StatisticsSlice.reducer;
