# install Backend PHP/YII2
you need to install composer to run the backend

```
> cd yii-soap
> composer install
```

open file **yii-soap/config/db.php** and configure the database

Run migrations with 
```
> php yii migrate
```


#install Rest Server NODE/EXPRESS
open file **/express-rest/index.php** in line 17
```php
const url  = 'http://wallet.local/service/soap';
``` 
change it to point the url to your backend then run
```
> node index.js
```

#install Frontend JAVASCRIPT/REACT
open file **/react-frontend/src/store/middleware/api.js** in line 20
```javascript
baseURL: 'http://127.0.0.1:3000/api/'
``` 
change it to point the url to your node server then run
```
> yarn install
> yarn start
```

#Postman collection

```
https://www.getpostman.com/collections/291d94e42a8efbc03a70
```

