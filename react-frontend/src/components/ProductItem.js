import React from "react";

const styles = {
	container: {
		display       : "inline-flex",
		flexDirection : "column",
		justifyContent: "center",
		alignItems    : "center",
		margin        : 24,
		background    : "#555599",
		width         : 180, height: 280, overflow: 'hidden',
		borderRadius  : 4,
	},
	image    : {width: 120, height: 120},
	name     : {height: 32, padding: 16, textAlign: 'center', color: "#eeeeee"},
	price    : {color: "#cccccc"},
	button   : {
		color          : "#444444",
		backgroundColor: "white",
		borderRadius   : 4,
		padding        : "5px 20px",
		marginTop      : 16,
		border         : 'none'
	}
};

export default ({product, onBuyClick}) =>
	<div style={styles.container}>
		<img src={product.image} alt="" style={styles.image}/>
		<span style={styles.name}>{product.name}</span>
		<span style={styles.price}>{product.price} $us</span>
		<button style={styles.button} onClick={() => {
			onBuyClick(product);
		}}>Buy
		</button>
	</div>