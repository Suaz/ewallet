import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MessageBox from "./components/MessageBox";
import Nav from "./components/Nav";
import configureStore from "./store/configureStore";
import AddMoney from "./views/AddMoney";
import CheckMoney from "./views/CheckMoney";
import Home from "./views/Home";
import RegisterClient from "./views/RegisterClient";
import Store from "./views/Store";

const store = configureStore();

function App() {
	
	
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Nav/>
					
					{/* A <Switch> looks through its children <Route>s and
					 renders the first one that matches the current URL. */}
					<Switch>
						
						<Route path="/register-client">
							<RegisterClient/>
						</Route>
						<Route path="/add-money">
							<AddMoney/>
						</Route>
						<Route path="/check-money">
							<CheckMoney/>
						</Route>
						<Route path="/shop">
							<Store/>
						</Route>
						<Route path="/">
							<Home/>
						</Route>
					</Switch>
					
					<MessageBox/>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
