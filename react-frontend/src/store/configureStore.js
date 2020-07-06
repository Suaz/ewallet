import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from "redux";
import api from "./middleware/api";
import walletReducer from "./walletReducer";

const reducers = combineReducers({
	wallet: walletReducer
});

export default () => {
	return configureStore({
		reducer   : reducers,
		middleware: [...getDefaultMiddleware(), api]
	});
};