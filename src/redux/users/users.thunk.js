import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '@services/user.service';

export const getListUser = createAsyncThunk('users/getList', async ({ page, limit, query, role }, thunkAPI) => {
	try {
		return await userService.getListUser(page, limit, query, role);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const getUserById = createAsyncThunk('users/getUserById', async (id, thunkAPI) => {
	try {
		return await userService.getUserById(id);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }, thunkAPI) => {
	try {
		return await userService.updateUser(id, data);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
	try {
		return await userService.deleteUser(id);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const updateStatusUser = createAsyncThunk('users/updateStatusUser', async ({ id, status }, thunkAPI) => {
	try {
		return await userService.updateStatusUser(id, status);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const createUser = createAsyncThunk('users/createUser', async (data, thunkAPI) => {
	try {
		return await userService.register(data);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
