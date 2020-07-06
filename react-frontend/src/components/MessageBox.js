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
};

export default () => {
	const wallet = useSelector(store => store.wallet);
	
	return <div style={styles.container}>
		<p>{wallet.message}</p>
	</div>;
}