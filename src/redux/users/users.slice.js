import { createSlice } from '@reduxjs/toolkit';
import { getListUser, getUserById, updateUser, updateStatusUser, deleteUser, createUser } from './users.thunk';
import { CatchError } from '@common/utils/method.util';
export const AuthSlice = createSlice({
	name: 'users',
	initialState: {
		listUser: [],
		selectUser: {},
	},
	reducers: {
		SetUser: (state, action) => {
			state.selectUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getListUser.fulfilled, (state, action) => {
				state.listUser = action.payload;
			})
			.addCase(getListUser.rejected, (state, action) => {
				CatchError(action.payload);
				state.listUser = [];
			});
		builder
			.addCase(getUserById.fulfilled, (state, action) => {
				state.selectUser = action.payload;
			})
			.addCase(getUserById.rejected, (state, action) => {
				CatchError(action.payload);
				state.selectUser = {};
			});
		builder
			.addCase(updateUser.fulfilled, (state, action) => {
				state.selectUser = action.payload;
			})
			.addCase(updateUser.rejected, (state, action) => {
				CatchError(action.payload);
				state.selectUser = {};
			});
		builder
			.addCase(updateStatusUser.fulfilled, (state, action) => {
				state.selectUser = action.payload;
				state.listUser.data = state.listUser.data.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					}
					return item;
				});
			})
			.addCase(updateStatusUser.rejected, (state, action) => {
				CatchError(action.payload);
				state.selectUser = {};
			});
		builder
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.selectUser = action.payload;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				CatchError(action.payload);
				state.selectUser = {};
			});
		builder
			.addCase(createUser.fulfilled, (state, action) => {
				state.listUser.data.push(action.payload);
			})
			.addCase(createUser.rejected, (state, action) => {
				CatchError(action.payload);
			});
	},
});

// Action creators are generated for each case reducer function
export const { SetUser } = AuthSlice.actions;
// selectors
export const selectListUser = (state) => state.users.listUser;
export const selectSelectUser = (state) => state.users.selectUser;

export default AuthSlice.reducer;
