const ACCESS_TOKEN_KEY = 'access_token';

export const getAccessToken = () => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};
export const setAccessToken = (token) => {
	localStorage.setItem(ACCESS_TOKEN_KEY, token);
};
export const removeAccessToken = () => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
};
export const getByKey = (key) => {
	return localStorage.getItem(key);
};
export const setByKey = (key, value) => {
	localStorage.setItem(key, value);
};
