import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {confirmPayment} from "../store/walletReducer";
import Title from "./Title";

const styles = {
	container         : {margin: 24},
	form              : {
		display      : 'flex',
		flexDirection: 'column'
	},
	formFieldContainer: {
		marginBottom : 16,
		display      : "flex",
		flexDirection: "column"
	},
	formField         : {
		padding : 12,
		maxWidth: 400
	},
	formLabel         : {color: "#555599", marginBottom: 8},
	error             : {color: '#dd3333'},
	button            : {
		color          : "white",
		backgroundColor: "#555599",
		padding        : 12,
		maxWidth       : 400,
		border         : 'none',
		borderRadius   : 4,
		cursor         : 'pointer'
	}
};
export default () => {
	const dispatch                         = useDispatch();
	const wallet                           = useSelector(store => store.wallet);
	const {handleSubmit, register, errors} = useForm();
	const onSubmit                         = values => {
		dispatch(confirmPayment({
			transaction: wallet.transaction,
			token      : values.token,
		}));
	};
	return <div>
		<Title title="Confirm your purchase, insert the verification token"/>
		<form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
			<div style={styles.formFieldContainer}>
				<label htmlFor="token" style={styles.formLabel}>Token</label>
				<input
					name="token"
					placeholder="token"
					ref={register({
						required: "Required"
					})}
					style={styles.formField}
				/>
				{errors.token && <small style={styles.error}>{errors.token.message}</small>}
			</div>
			<button type="submit" style={styles.button}>Confirm payment</button>
		</form>
	</div>;
}