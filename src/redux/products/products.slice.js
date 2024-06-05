import { createSlice } from '@reduxjs/toolkit';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './products.thunk';
import { CatchError } from '@common/utils/method.util';
export const ProductSlice = createSlice({
	name: 'products',
	initialState: {
		products: [],
		productSelected: {},
		query: {},
	},
	reducers: {
		SetProduct: (state, action) => {
			state.productSelected = action.payload;
		},
		SetQuery: (state, action) => {
			state.query = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});
		builder.addCase(getProductById.fulfilled, (state, action) => {
			state.productSelected = action.payload;
		});
		builder.addCase(createProduct.fulfilled, (state, action) => {
			state.productSelected = action.payload;
		});
		builder.addCase(createProduct.rejected, (state, action) => {
			CatchError(action.payload);
		});
		builder.addCase(updateProduct.fulfilled, (state, action) => {
			state.productSelected = action.payload;
		});
		builder.addCase(updateProduct.rejected, (state, action) => {
			CatchError(action.payload);
		});
		builder.addCase(deleteProduct.fulfilled, (state, action) => {
			state.productSelected = action.payload;
		});
	},
});

// Action creators are generated for each case reducer function
export const { SetProduct, SetQuery } = ProductSlice.actions;
// selectors
export const selectProducts = (state) => state.products.products;
export const selectProductSelected = (state) => state.products.productSelected;
export default ProductSlice.reducer;
