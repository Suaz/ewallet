import React from "react";
import {useSelector} from "react-redux";

const styles = {
	container: {
		backgroundColor: "#555599",
		padding        : 16,
		color          : "#ffffff",
		borderRadius   : 4,
		display        : "flex",
		flexDirection  : "column"
	},
	small    : {marginBottom: 8},
	span     : {},
	button   : {
		color          : "white",
		backgroundColor: "#555599",
		padding        : 8,
		maxWidth       : 70,
		border         : 'solid 1px white',
		borderRadius   : 4,
		cursor         : 'pointer',
		marginTop      : 8
	}
};

export default () => {
	
	const wallet = useSelector(store => store.wallet);
	
	return <div style={styles.container}>
		<small style={styles.small}>current account:</small>
		<span>document: <b>{wallet.document}</b>, cellphone: <b>{wallet.cellphone}</b></span>
		<button style={styles.button} onClick={() => {
			console.log("logout");
		}}>logout
		</button>
	</div>;
}