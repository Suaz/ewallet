const express    = require("express");
const cors       = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


const soap = require('soap');
const url  = 'http://wallet.local/service/soap';

app.post('/api/register-client', function (req, res) {
	soap.createClientAsync(url)
			.then((client) => {
				return client.registerClientAsync({
					'document' : req.body.document,
					'cellphone': req.body.cellphone,
					'fullName' : req.body.fullName,
					'email'    : req.body.email,
				});
			})
			.then((result) => {
					const response = {
						[result[0].return.item[0].key["$value"]]: result[0].return.item[0].value["$value"],
						[result[0].return.item[1].key["$value"]]: result[0].return.item[1].value["$value"],
					};
					res.send(response);
				}
			);
});
app.post('/api/add-money', function (req, res) {
	soap.createClientAsync(url)
			.then((client) => {
				return client.addMoneyAsync({
					'document' : req.body.document,
					'cellphone': req.body.cellphone,
					'amount'   : req.body.amount,
				});
			})
			.then((result) => {
					const response = {
						[result[0].return.item[0].key["$value"]]: result[0].return.item[0].value["$value"],
						[result[0].return.item[1].key["$value"]]: result[0].return.item[1].value["$value"],
					};
					res.send(response);
				}
			);
});
app.post('/api/make-payment', function (req, res) {
	soap.createClientAsync(url)
			.then((client) => {
				const params = {
					'document'   : req.body.document,
					'cellphone'  : req.body.cellphone,
					'amount'     : req.body.amount,
					'description': req.body.description,
				};
				return client.makePaymentAsync(params);
			})
			.then((result) => {
					const response = {
						[result[0].return.item[0].key["$value"]]: result[0].return.item[0].value["$value"],
						[result[0].return.item[1].key["$value"]]: result[0].return.item[1].value["$value"],
						[result[0].return.item[2].key["$value"]]: result[0].return.item[2].value["$value"],
						[result[0].return.item[3].key["$value"]]: result[0].return.item[3].value["$value"],
					};
					res.send(response);
				}
			)
			.catch(ex => console.log(ex.message));
});
app.post('/api/confirm-payment', function (req, res) {
	soap.createClientAsync(url)
			.then((client) => {
				return client.confirmPaymentAsync({
					'transaction': req.body.transaction,
					'token'      : req.body.token
				});
			})
			.then((result) => {
					const response = {
						[result[0].return.item[0].key["$value"]]: result[0].return.item[0].value["$value"],
						[result[0].return.item[1].key["$value"]]: result[0].return.item[1].value["$value"],
					};
					res.send(response);
				}
			);
});

app.post('/api/check-money', function (req, res) {
	soap.createClientAsync(url)
			.then((client) => {
				return client.checkMoneyAsync({
					'document' : req.body.document,
					'cellphone': req.body.cellphone
				});
			})
			.then((result) => {
					const response = {
						[result[0].return.item[0].key["$value"]]: result[0].return.item[0].value["$value"],
						[result[0].return.item[1].key["$value"]]: result[0].return.item[1].value["$value"],
					};
					res.send(response);
				}
			);
	
});

app.listen(3000, () => {
	console.log("El servidor está inicializado en el puerto 3000");
});