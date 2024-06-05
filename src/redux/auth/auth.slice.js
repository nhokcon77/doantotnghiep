import { createSlice } from '@reduxjs/toolkit';
import { getMe, uploadAvatar } from './auth.thunk';
import { CatchError } from '@common/utils/method.util';
export const AuthSlice = createSlice({
	name: 'auth',
	initialState: {
		userInfo: {},
		role: null,
		loading: false,
		error: null,
	},
	reducers: {
		userInfo: (state, action) => {
			state = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getMe.fulfilled, (state, action) => {
			state.userInfo = action.payload;
			state.role = action.payload.role;
		});
		builder.addCase(getMe.rejected, (state, action) => {
			CatchError(action.payload);
		});
		builder.addCase(uploadAvatar.fulfilled, (state, action) => {
			state.userInfo = action.payload;
		});
		builder.addCase(uploadAvatar.rejected, (state, action) => {
			CatchError(action.payload);
		});
	},
});

// Action creators are generated for each case reducer function
export const { userInfo } = AuthSlice.actions;
// selectors
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectRole = (state) => state.auth.role;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default AuthSlice.reducer;
