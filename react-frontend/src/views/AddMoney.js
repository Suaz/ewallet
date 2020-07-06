import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Title from "../components/Title";
import {addMoney} from "../store/walletReducer";

const styles = {
	container         : {margin: 24},
	account           : {
		backgroundColor: "#555599"
	},
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

const AddMoney = () => {
	const dispatch                         = useDispatch();
	const wallet                           = useSelector(store => store.wallet);
	const {handleSubmit, register, errors} = useForm({
		defaultValues: {
			document : wallet.document,
			cellphone: wallet.cellphone
		},
	});
	const onSubmit                         = values => {
		dispatch(addMoney(values));
	};
	
	
	return <div>
		<Title title="Add money to your account"/>
		<div style={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)}>
				
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
				
				<div style={styles.formFieldContainer}>
					<label htmlFor="amount" style={styles.formLabel}>amount</label>
					<input
						name="amount"
						placeholder="$us"
						ref={register({
							required: "Required"
						})}
						style={styles.formField}
					/>
					{errors.amount && <small style={styles.error}>{errors.amount.message}</small>}
				</div>
				{errors.fullName && errors.fullName.message}
				
				<button type="submit" style={styles.button}>Add money to my wallet</button>
			</form>
		</div>
	</div>;
};

export default AddMoney;