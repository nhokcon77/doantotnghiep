import { createSlice } from '@reduxjs/toolkit';
import { getSetting, updateSetting } from './setting.thunk';
export const SettingSlice = createSlice({
	name: 'setting',
	initialState: {
		client_id: '',
		client_secret: '',
		fb_exchange_token: '',
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getSetting.fulfilled, (state, action) => {
			state.client_id = action.payload.setting.client_id;
			state.client_secret = action.payload.setting.client_secret;
			state.fb_exchange_token = action.payload.setting.fb_exchange_token;
		});
		builder.addCase(updateSetting.fulfilled, (state, action) => {
			state.client_id = action.payload.setting.client_id;
			state.client_secret = action.payload.setting.client_secret;
			state.fb_exchange_token = action.payload.setting.fb_exchange_token;
		});
	},
});

// Action creators are generated for each case reducer function

export const SettingSelector = (state) => state.setting;
// selectors
export default SettingSlice.reducer;
