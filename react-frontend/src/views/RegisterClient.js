import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Title from "../components/Title";
import {createClient} from "../store/walletReducer";

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

const RegisterClient = () => {
	const dispatch                         = useDispatch();
	const message                          = useSelector(store => store.wallet.message);
	const {handleSubmit, register, errors} = useForm();
	const onSubmit                         = values => {
		dispatch(createClient(values));
	};
	return <div>
		<Title title="Create new Client"/>
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
				<div style={styles.formFieldContainer}>
					<label htmlFor="fullName" style={styles.formLabel}>fullName</label>
					<input
						name="fullName"
						placeholder="fullName"
						ref={register({
							required: "Required"
						})}
						style={styles.formField}
					/>
					{errors.fullName && <small style={styles.error}>{errors.fullName.message}</small>}
				</div>
				<div style={styles.formFieldContainer}>
					<label htmlFor="email" style={styles.formLabel}>email</label>
					<input
						name="email"
						placeholder="email"
						ref={register({
							required: "Required",
							pattern : {
								value  : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "invalid email address"
							}
						})}
						style={styles.formField}
					/>
					{errors.email && <small style={styles.error}>{errors.email.message}</small>}
				</div>
				<button type="submit" style={styles.button}>Submit</button>
			</form>
		</div>
	</div>;
};

export default RegisterClient;