import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import ConfirmBox from "../components/ConfirmBox";
import MailNotification from "../components/MailNotification";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import {makePayment} from "../store/walletReducer";

const products = [
	{
		id   : 1,
		name : "Superman Multiverse",
		price: 180.0,
		image: "https://cdn.shopify.com/s/files/1/0081/6168/9671/products/41R3R8AtLDL.jpg?v=1589736366",
	},
	{
		id   : 2,
		name : "Harley Queen Multiverse",
		price: 130.0,
		image: "https://www.actionfiguremania.it/18390-home_default/mcfarlane-toys-dc-rebirth-action-figure-harley-quinn-classic-18-cm.jpg",
	},
	{
		id   : 3,
		name : "FunkoVerse",
		price: 150.0,
		image: "https://2nwywu3l46cl1fpifo21a6n8-wpengine.netdna-ssl.com/wp-content/uploads/2019/11/ZFU-42628.jpg",
	},
	{
		id   : 4,
		name : "Batman Animated Series",
		price: 170.0,
		image: "https://media.kohlsimg.com/is/image/kohls/2795393?wid=500&hei=500&op_sharpen=1",
	},
	{
		id   : 5,
		name : "Funko pop Clark Kent key holder",
		price: 85.0,
		image: "https://made-in-bocholt-ifmy37pma.netdna-ssl.com/wp-content/uploads/2020/04/x_fk21774-500x500.jpg",
	},
	{
		id   : 6,
		name : "Batman Armored",
		price: 220.0,
		image: "https://www.storkz.com/media/catalog/product/cache/1/image/500x500/9df78eab33525d08d6e5fb8d27136e95/s/2/s20703866.jpg",
	},
];

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
};

const CheckMoney = () => {
	const dispatch                      = useDispatch();
	const wallet                        = useSelector(store => store.wallet);
	const {register, errors, getValues} = useForm({
		defaultValues: {
			document : wallet.document,
			cellphone: wallet.cellphone
		},
	});
	
	const buyHandler = (product) => {
		dispatch(makePayment({
			document   : getValues().document,
			cellphone  : getValues().cellphone,
			amount     : product.price,
			description: product.name
		}));
	};
	return <div>
		
		<Title title="Account Info"/>
		
		<div style={styles.container}>
			{
				<form style={styles.form}>
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
				</form>
			}
			{
				(wallet.transaction > 0 && <ConfirmBox/>)
			}
		</div>
		<Title title="Toy Store"/>
		{
			products.map(product => {
				return <ProductItem
					key={product.id}
					product={product}
					onBuyClick={buyHandler}/>;
			})
		}
		{wallet.transaction > 0 && <MailNotification/>}
	
	
	</div>;
};
export default CheckMoney;
