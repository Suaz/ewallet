import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Title from "../components/Title";
import {checkMoney} from "../store/walletReducer";

const styles     = {
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
const CheckMoney = () => {
	const dispatch                         = useDispatch();
	const wallet                           = useSelector(store => store.wallet);
	const {handleSubmit, register, errors} = useForm({
		defaultValues: {
			document : wallet.document,
			cellphone: wallet.cellphone
		},
	});
	const onSubmit                         = values => {
		dispatch(checkMoney(values));
	};
	
	
	return <div>
		<Title title="Check money available in your account"/>
		<div style={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
				<div style={styles.formFieldContainer}>
					<label htmlFor="document" style={styles.formLabel}>Document</label>
					<input
						name="document"
						placeholder="document"
						ref={register({
							required: "Required"
						})}
						style={styles.formField}
					/>
					{errors.document && <small style={styles.error}>{errors.document.message}</small>}
				</div>
				
				<div style={styles.formFieldContainer}>
					<label htmlFor="cellphone" style={styles.formLabel}>cellphone</label>
					<input
						name="cellphone"
						placeholder="cellphone"
						ref={register({
							required: "Required"
						})}
						style={styles.formField}
					/>
					{errors.cellphone && <small style={styles.error}>{errors.cellphone.message}</small>}
				</div>
				<button type="submit" style={styles.button}>Check Money available</button>
			</form>
		</div>
	</div>;
};

export default CheckMoney;