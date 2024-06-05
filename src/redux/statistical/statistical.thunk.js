import { createAsyncThunk } from '@reduxjs/toolkit';
import statisticalService from '@services/statistical.service';
import { toDate } from '@common/utils/method.util';

export const getData = createAsyncThunk('statistics/getData', async (params, thunkAPI) => {
	return await statisticalService.getData(params).catch(thunkAPI.rejectWithValue);
});

export const update = createAsyncThunk('statistics/update', async (data, thunkAPI) => {
	const result = await statisticalService.update(data.id, data).catch(thunkAPI.rejectWithValue);
	if (result) {
		const { stageTest2, fromDate, toDate } = data;
		thunkAPI.dispatch(getData({ stageTest: stageTest2, fromDate, toDate }));
	}
	return result;
});
