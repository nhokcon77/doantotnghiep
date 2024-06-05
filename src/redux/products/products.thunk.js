import { createAsyncThunk } from '@reduxjs/toolkit';
import productService from '@services/product.service';
import { SetQuery } from './products.slice';
import store from '@redux/store';
export const getProducts = createAsyncThunk('products/getProducts', async ({ page, limit, query }, thunkApi) => {
	thunkApi.dispatch(SetQuery({ page, limit, query }));
	return await productService.getListProduct(page, limit, query);
});

export const getProductById = createAsyncThunk('products/getProductById', async (id) => {
	return await productService.getProductById(id);
});

export const createProduct = createAsyncThunk('products/createProduct', async (data, thunkApi) => {
	const result = await productService.createProduct(data).catch(thunkApi.rejectWithValue);
	thunkApi.dispatch(SetQuery({ ...store.getState().products.query }));
	return result;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }, thunkApi) => {
	const result = await productService.updateProduct(id, data).catch(thunkApi.rejectWithValue);
	thunkApi.dispatch(SetQuery({ ...store.getState().products.query }));
	return result;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
	const result = await productService.deleteProduct(id);
	store.dispatch(SetQuery({ ...store.getState().products.query }));
	return result;
});
