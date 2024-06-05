import { createSlice } from '@reduxjs/toolkit';
import {getListOrder, getOrderById, createOrder, updateOrder, deleteOrder, returnOrder, orderShipping, updateTypeOrder, updateStatusOrder, cancelOrder, updateStatusByshipOrderNotCreate} from './orders.thunk';
import { CatchError, Notification } from '@common/utils/method.util';
export const OrdersSlice = createSlice({
	name: 'orders',
	initialState: {
		listOrder: [],
		selectOrder: {},
		isLoading: false,
		query: {},
	},
	reducers: {
		SetOrder: (state, action) => {
			state.selectOrder = action.payload;
		},
		PushOrder: (state, action) => {
			var listorder = state.listOrder.data;
			state.listOrder.data = [action.payload, ...listorder];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getListOrder.fulfilled, (state, action) => {
			state.listOrder = action.payload;
		});

		builder.addCase(getOrderById.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
		});
		builder.addCase(createOrder.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
			state.isLoading = false;
		});
		builder.addCase(createOrder.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(createOrder.rejected, (state, action) => {
			CatchError(action.payload);
			//Notification("Lỗi",action?.payload || "Lỗi không xác định").error();
		});
		builder.addCase(updateOrder.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
		});
		builder.addCase(updateOrder.rejected, (state, action) => {
			CatchError(action.payload);
		});
		builder.addCase(deleteOrder.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
		});
		builder.addCase(returnOrder.rejected, (state, action) => {
			CatchError(action.payload);
		});
		builder.addCase(orderShipping.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
			Notification('success', 'Thành công', 'Tạo đơn GHTK thành công').success();
		});
		builder.addCase(orderShipping.rejected, (state, action) => {
			CatchError(action?.payload);
		});
		builder.addCase(updateTypeOrder.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
		});
		builder.addCase(updateTypeOrder.rejected, (state, action) => {
			CatchError(action.payload);
		});

		builder.addCase(updateStatusOrder.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
		});

		builder.addCase(updateStatusOrder.rejected, (state, action) => {
			CatchError(action.payload);
		});

		builder
			.addCase(cancelOrder.fulfilled, (state, action) => {
				Notification('success', 'Thành công', 'Gửi yêu cầu hủy đơn đến GHTK thành công vui lòng chờ duyệt').success();
			})
			.addCase(cancelOrder.rejected, (state, action) => {
				CatchError(action.payload);
			});

		builder
		.addCase(updateStatusByshipOrderNotCreate.fulfilled, (state, action) => {
			state.selectOrder = action.payload;
		})
		.addCase(updateStatusByshipOrderNotCreate.rejected, (state, action) => {
			CatchError(action.payload);
		});
	},
});

// Action creators are generated for each case reducer function
export const { SetOrder, NewOrderComfine, NewOrderRaw, PushOrder } = OrdersSlice.actions;
// selectors
export const selectListOrder = (state) => state.orders.listOrder;
export const selectSelectOrder = (state) => state.orders.selectOrder;
export const selectIsLoading = (state) => state.orders.isLoading;
export const selectQuery = (state) => state.orders.query;
export default OrdersSlice.reducer;
