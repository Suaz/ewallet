import React from "react";
import {useSelector} from "react-redux";

const styles = {
	container: {
		backgroundColor: 'white',
		border         : 'solid red',
		borderTop      : 'solid red 6px',
		position       : 'fixed',
		padding        : 16,
		bottom         : 16,
		right          : 16,
	},
	h3       : {
		display       : 'flex',
		flexDirection : 'row',
		justifyContent: 'space-between',
		marginTop     : 8,
		marginBottom  : 24,
		
	},
	button   : {
		border         : 'none',
		backgroundColor: "white",
		cursor         : 'pointer',
		display        : 'none',
	}
};
export default () => {
	const wallet = useSelector(store => store.wallet);
	return <div style={styles.container}>
		<h3 style={styles.h3}>You got new mail <button style={styles.button}>X</button></h3>
		<p>use this token <b>{wallet.token}</b> to confirm your purchase</p>
	</div>;
}