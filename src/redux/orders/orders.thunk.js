import { createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '@services/order.service';
import { PushOrder } from './orders.slice';
import ghtkService from '@services/ghtk.service';

export const getListOrder = createAsyncThunk('orders/getListOrder', async ({ page = 1, limit, query = '', sort = [], type, status, fromDate, toDate }, thunkApi) => {
	return await orderService.getListOrder(page, limit, query, sort, type, status, fromDate, toDate).catch(thunkApi.rejectWithValue);
});

export const getOrderById = createAsyncThunk('orders/getOrderById', async (id, thunkApi) => {
	return await orderService.getOrderById(id).catch(thunkApi.rejectWithValue);
});

export const createOrder = createAsyncThunk('orders/createOrder', async (data, thunkApi) => {
	const result = await orderService.createOrder(data).catch(thunkApi.rejectWithValue);
	thunkApi.dispatch(PushOrder(result));
	return result;
});

export const updateOrder = createAsyncThunk('orders/updateOrder', async (data, thunkApi) => {
	return await orderService.updateOrder(data.id, data.type, data).catch(thunkApi.rejectWithValue);
});

export const updateTypeOrder = createAsyncThunk('orders/updateTypeOrder', async (data, thunkApi) => {
	return await orderService.updateTypeOrder(data.id, data.type,data).catch(thunkApi.rejectWithValue);
});
export const updateStatusOrder = createAsyncThunk('orders/updateStatusOrder', async (data, thunkApi) => {
	return await orderService.updateStatusOrder(data.id, data.status).catch(thunkApi.rejectWithValue);
});
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (id, thunkApi) => {
	return await orderService.deleteOrder(id).catch(thunkApi.rejectWithValue);
});
export const returnOrder = createAsyncThunk('orders/returnOrder', async (data, thunkApi) => {
	return await orderService.returnOrder(data.id, data).catch(thunkApi.rejectWithValue);
});
export const orderShipping = createAsyncThunk('orders/orderShipping', async (id, thunkApi) => {
	return await orderService.orderShipping(id).catch(thunkApi.rejectWithValue);
});
export const cancelOrder = createAsyncThunk('orders/cancelOrder', async (id, thunkApi) => {
	return await ghtkService.cancelOrder(id).catch(thunkApi.rejectWithValue);
});
export const updateStatusByshipOrderNotCreate = createAsyncThunk('orders/updateStatusByshipOrderNotCreate', async (data, thunkApi) => {
	const result =  await orderService.updateStatusByshipOrderNotCreate(data.id).catch(thunkApi.rejectWithValue);
	thunkApi.dispatch(getListOrder(data));
	return result;
});
