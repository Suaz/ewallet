import axios from 'axios';
import {apiCallBegin, apiCallFail, apiCallSuccess} from "../api";

const api = store => next => async action => {
	
	if (action.type !== apiCallBegin.type) return next(action);
	
	const {
					url,
					method,
					data,
					onStart,
					onSuccess,
					onError
				} = action.payload;
	if (onStart) store.dispatch({type: onStart});
	next(action);
	try {
		const config   = {
			baseURL: 'http://127.0.0.1:3000/api/',
			method : method,
			data   : data,
			url    : url
		};
		const response = await axios.request(config);
		
		apiCallSuccess({...response.data, ...data});
		if (onSuccess) store.dispatch({type: onSuccess, payload: {...response.data, ...data}});
	} catch (error) {
		apiCallFail(error.message);
		if (onError) store.dispatch({type: onError, payload: error.message});
	}
};
export default api;