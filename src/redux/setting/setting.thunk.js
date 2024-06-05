import { createAsyncThunk } from '@reduxjs/toolkit';
import settingService from '@services/setting.service';

export const getSetting = createAsyncThunk('setting/getSetting', async (data, thunkAPI) => {
	return await settingService.get().catch(thunkAPI.rejectWithValue);
});

export const updateSetting = createAsyncThunk('setting/updateSetting', async (data, thunkAPI) => {
	return await settingService.update(data).catch(thunkAPI.rejectWithValue);
});
