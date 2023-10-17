CPS630 SMART CUSTOMER SERVICES

-----------------------------------------------------------------------

Database Setup:
1) Open XAMPP Control Panel and start Apache and MySQL modules.
2) Open localhost in browser and navigate to phpMyAdmin, then to the SQL tab.
3) Copy and paste the following SQL code to create tables (press go):

START TRANSACTION;
CREATE DATABASE cps630project;
USE cps630project;
CREATE TABLE web_user(
	id int AUTO_INCREMENT,
    firstname varchar(20) NOT NULL,
    lastname varchar(20) NOT NULL,
    phone char(10),
    email varchar(30),
    address varchar(255),
    postal_code char(7),
    username varchar(30) NOT NULL,
    pass varchar(127) NOT NULL,
    admin boolean NOT NULL,
    salt char(10) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE item(
	id int AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    original_price decimal(10,2) NOT NULL,
    price decimal(10,2) NOT NULL,
    image_url varchar(2048) NOT NULL,
    description varchar(500) DEFAULT '',
    department varchar(20) DEFAULT 'Furniture',
    category enum('Chair', 'Table', 'Bed frame', 'Couch') NOT NULL,
    quantity int DEFAULT 0 CHECK (quantity >= 0),
    sale boolean NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE purchase_order(
	id int AUTO_INCREMENT,
    date_issued date,
    user_id int NOT NULL,
    card_num char(128) NOT NULL,
    cvv char(128) NOT NULL,
    expiry char(4) NOT NULL,
    amount decimal(10,2),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES web_user(id)
);
CREATE TABLE includes(
	item_id int,
    order_id int,
    quantity int DEFAULT 1 CHECK (quantity > 0),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (order_id) REFERENCES purchase_order(id),
    PRIMARY KEY (item_id, order_id)
);
CREATE TABLE cart(
	id int,
    amount decimal(10,2) DEFAULT 0,
    FOREIGN KEY (id) REFERENCES web_user(id),
    PRIMARY KEY (id)
);
CREATE TABLE on_hold(
	cart_id int,
    item_id int,
    quantity int DEFAULT 1 CHECK (quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    PRIMARY KEY (cart_id, item_id)
);
CREATE TABLE store(
    id int AUTO_INCREMENT,
    name varchar(20) NOT NULL,
    address varchar(255),
    postal_code char(7),
    PRIMARY KEY (id)
);
CREATE TABLE truck(
	id int AUTO_INCREMENT,
    license_plate char(5) NOT NULL,
    model varchar(10) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE trip(
    id int AUTO_INCREMENT,
    order_id int NOT NULL,
    truck_id int,
    store_id int,
    status enum('In progress', 'Delivered') DEFAULT 'In progress',
    deliveryDate date,
    deliveryTime varchar(10),
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES purchase_order(id),
    FOREIGN KEY (truck_id) REFERENCES truck(id),
    FOREIGN KEY (store_id) REFERENCES store(id)
);
CREATE TABLE reviews(
    id int AUTO_INCREMENT,
    review text,
    ranking int CHECK (ranking >= 1 AND ranking <= 5),
    item_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (user_id) REFERENCES web_user(id)
);
COMMIT;

4) Copy and paste following code to populate tables (press go):
Note: sample data provides an admin user with this login credentials: username: admin, password: admin

START TRANSACTION;
USE cps630project;
INSERT INTO item(name, original_price, price, image_url, category, quantity, sale)
VALUES ('Couch 1', 200, 200, 'https://cdn-images.article.com/products/SKU2128/2890x1500/image88973.jpg?w=2740&q=60&fm=webp&fit=max', 'Couch', 10, FALSE);
INSERT INTO item(name, original_price, price, image_url, category, quantity, sale)
VALUES ('Couch 2', 300, 300, 'https://cdn-images.article.com/products/SKU2128/2890x1500/image88973.jpg?w=2740&q=60&fm=webp&fit=max', 'Couch', 21, FALSE);
INSERT INTO item(name, original_price, price, image_url, category, quantity, sale)
VALUES ('Couch 3', 130, 130, 'https://cdn-images.article.com/products/SKU2128/2890x1500/image88973.jpg?w=2740&q=60&fm=webp&fit=max', 'Couch', 12, FALSE);
INSERT INTO item(name, original_price, price, image_url, category, quantity, sale)
VALUES ('Conan Walnut Table', 75.99, 75.99, 'https://cdn-images.article.com/products/SKU45/2890x1500/image42452.jpg', 'Table', 100, FALSE);
INSERT INTO item(name, original_price, price, image_url, category, quantity, sale)
VALUES ('Fancy Table', 120.55, 120.55, 'https://cdn-images.article.com/products/SKU45/2890x1500/image42452.jpg', 'Table', 17, FALSE);
INSERT INTO item(name, original_price, price, image_url, category, quantity, sale)
VALUES ('Couch 4', 200, 150, 'https://cdn-images.article.com/products/SKU2128/2890x1500/image88973.jpg?w=2740&q=60&fm=webp&fit=max', 'Couch', 12, TRUE);
INSERT INTO item(name, original_price, price, image_url, category, quantity, sale)
VALUES ('Brown Table', 59, 49, 'https://cdn-images.article.com/products/SKU45/2890x1500/image42452.jpg', 'Table', 100, TRUE);
INSERT INTO store(name, address, postal_code)
VALUES ('Yonge - Dundas', '350 Victoria St, Toronto, ON M5B 2K3', 'M5B 2K3');
INSERT INTO store(name, address, postal_code)
VALUES ('Spadina', '1 Spadina Ave., Toronto, ON M5R 2S9', 'M5R 2S9');
INSERT INTO store(name, address, postal_code)
VALUES ('Bloor - Yonge', '2 Bloor St E, Toronto, ON M4W 1A8', 'M4W 1A8');
INSERT INTO truck(license_plate, model)
VALUES ('12345', 'BAW Luling');
INSERT INTO truck(license_plate, model)
VALUES ('11111', 'Labo');
INSERT INTO truck(license_plate, model)
VALUES ('12121', 'Rivian');
INSERT INTO web_user(firstname, lastname, username, pass, admin, salt) VALUES ('admin', 'admin', 'admin','c11357bbb41ce6fa2c950109644f0628',TRUE, '9ImGr2L4e');
COMMIT;

-----------------------------------------------------------------------

Backend Setup:
1) Download cps630backend folder.
2) Move folder into /xampp/htdocs.

-----------------------------------------------------------------------

Frontend Setup:
1) Download cps630-spa-master folder.
2) In terminal, navigate to folder.
3) Run 'npm install' command (no quotes).
4) Run 'npm start' command (no quotes).
5) Application will open on browser through localhost:3000.

For more information, review the content below:

-----------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
