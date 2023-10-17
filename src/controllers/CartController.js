import {useEffect, useState} from "react";
import Cart from "../views/Cart";
import { Cookies } from 'react-cookie';
import {useNavigate} from "react-router-dom";

function CartController() {
    const cookie = new Cookies();
    const userId = cookie.get("id");
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        
        console.log("this is userid");
        console.log(userId);
        if (userId != undefined){   
            getItems();
            getTotalAmount();
        }
        else {
            alert("Sign in to view your shopping cart");
            navigate("/signin");
            return;
        }
    }, []);


    const getItems = () => {
        fetch("http://localhost/cps630backend/get.php", {
            method: "POST",
            body: JSON.stringify({query:"SELECT name, price, on_hold.quantity, image_url FROM item, on_hold WHERE item.id = on_hold.item_id AND cart_id=" + userId}),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Handle the response data
                setItems(JSON.parse(data));
            })
            .catch((error) => console.error(error));

    }

    const getTotalAmount = () => {
        fetch("http://localhost/cps630backend/get.php", {
            method: "POST",
            body: JSON.stringify({query:"SELECT amount FROM cart WHERE id=" + userId}),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Handle the response data
                setTotalAmount(JSON.parse(data)[0].amount);
            })
            .catch((error) => console.error(error));
    }

    const createOrder = (cardNumber, expiryDate, cvvNum) => {
        if (items.length == 0 ) {
            alert("Your cart is empty. \nGo to 'Shop' to add items.");
            return;
        }
        
        if (!validInput(cardNumber, expiryDate, cvvNum)) {
            const warning = document.getElementById("paymentWarning");
            warning.innerHTML = "Invalid card information";
            return;
        }
        fetch("http://localhost/cps630backend/createOrder.php", {
            method: "POST",
            body: JSON.stringify({cardNum: cardNumber, expirationDate: expiryDate, cvv: cvvNum, id: userId, amount: totalAmount}),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Handle the response data
                document.cookie = `order=${data}`;
                alert(`Placing order completes.\nYour order id is ${data}`);
                navigate("/delivery");
            })
            .catch((error) => console.error(error));
            
    }

    const validInput = (cardNum, expirationDate, cvv) => {
        const valid_length = expirationDate.length==4 && cardNum.length == 16 && cvv.length == 3;
        const digits_only = cardNum.match(/^[0-9]+$/) != null && expirationDate.match(/^[0-9]+$/) != null && cvv.match(/^[0-9]+$/) != null;
        return valid_length && digits_only;
    }
    return(
       <Cart items={items} totalAmount={totalAmount} createOrder={createOrder}/>
    );

}
export default CartController;