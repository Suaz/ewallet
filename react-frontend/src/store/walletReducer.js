import {createSlice} from "@reduxjs/toolkit";
import {apiCallBegin} from "./api";

const URL_CREATE_CLIENT   = "/register-client";
const URL_CHECK_MONEY     = "/check-money";
const URL_ADD_MONEY       = "/add-money";
const URL_MAKE_PAYMENT    = "/make-payment";
const URL_CONFIRM_PAYMENT = "/confirm-payment";

const walletSlice           = createSlice({
	name        : 'wallet',
	initialState: {
		document   : '',
		cellphone  : '',
		transaction: 0,
		message    : '',
		status     : '',
		token      : '',
	},
	reducers    : {
		setLoading      : (state, action) => {
			state.status  = 0;
			state.message = "Cargando, por favor espere";
		},
		clientCreated   : (state, action) => {
			state.status    = action.payload.status;
			state.message   = action.payload.message;
			state.cellphone = action.payload.cellphone;
			state.document  = action.payload.document;
		},
		moneyChecked    : (state, action) => {
			state.status    = action.payload.status;
			state.message   = action.payload.message;
			state.cellphone = action.payload.cellphone;
			state.document  = action.payload.document;
		},
		moneyAdded      : (state, action) => {
			state.status    = action.payload.status;
			state.message   = action.payload.message;
			state.cellphone = action.payload.cellphone;
			state.document  = action.payload.document;
		},
		paymentMade     : (state, action) => {
			console.log("TOKEN", action.payload.token);
			state.status      = action.payload.status;
			state.message     = action.payload.message;
			state.cellphone   = action.payload.cellphone;
			state.document    = action.payload.document;
			state.transaction = action.payload.transaction;
			state.token       = action.payload.token;
		},
		paymentConfirmed: (state, action) => {
			state.status      = action.payload.status;
			state.message     = action.payload.message;
			state.cellphone   = action.payload.cellphone;
			state.document    = action.payload.document;
			state.transaction = 0;
			state.token       = "";
		}
	}
});
export const createClient   = client => apiCallBegin({
	url      : URL_CREATE_CLIENT,
	method   : 'post',
	data     : client,
	onSuccess: clientCreated.type,
	onStart  : setLoading.type,
});
export const checkMoney     = data => apiCallBegin({
	url      : URL_CHECK_MONEY,
	method   : 'post',
	data     : data,
	onSuccess: moneyChecked.type,
	onStart  : setLoading.type,
});
export const addMoney       = data => apiCallBegin({
	url      : URL_ADD_MONEY,
	method   : 'post',
	data     : data,
	onSuccess: moneyAdded.type,
	onStart  : setLoading.type,
});
export const makePayment    = data => apiCallBegin({
	url      : URL_MAKE_PAYMENT,
	method   : 'post',
	data     : data,
	onSuccess: paymentMade.type,
	onStart  : setLoading.type,
});
export const confirmPayment = data => apiCallBegin({
	url      : URL_CONFIRM_PAYMENT,
	method   : 'post',
	data     : data,
	onSuccess: paymentConfirmed.type,
	onStart  : setLoading.type,
});

export const {setLoading, clientCreated, moneyChecked, moneyAdded, paymentMade, paymentConfirmed} = walletSlice.actions;
export default walletSlice.reducer;