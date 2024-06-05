import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '@services/user.service';

export const getMe = createAsyncThunk('auth/getMe', async (data, thunkApi) => {
	return await userService.getMe();
});

export const uploadAvatar = createAsyncThunk('auth/uploadAvatar', async (data) => {
	return await userService.uploadAvatar(data);
});
