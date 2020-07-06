import React from "react";
import {Link} from "react-router-dom";

const menu = [
	{
		path : "/",
		label: "Home",
	},
	{
		path : "/register-client",
		label: "Register Client",
	},
	{
		path : "/add-money",
		label: "Add money",
	},
	{
		path : "/check-money",
		label: "Check Money",
	},
	{
		path : "/shop",
		label: "Shop",
	}
];

const styles = {
	container    : {
		backgroundColor: "#555599",
		display        : "flex",
		flexDirection  : "row",
		justifyContent : "space-between",
		alignItems     : 'center'
	},
	listContainer: {margin: 0, padding: 8, display: "flex", flexDirection: "row"},
	listItem     : {margin: "8px 16px", listStyle: 'none'},
	link         : {color: "white", textDecoration: "none"}
};

export default () => {
	return <nav style={styles.container}>
		<ul style={styles.listContainer}>
			{
				menu.map(
					(item, index) => <li key={index} style={styles.listItem}>
						<Link style={styles.link} to={item.path}>{item.label}</Link>
					</li>
				)
			}
		</ul>
	</nav>;
}