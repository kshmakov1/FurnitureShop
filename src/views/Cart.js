import {useState} from "react";
import './styles/cart.css';

function Cart(props) {
    const [cardNum, setCardNum] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.createOrder(cardNum, expiryDate, cvv);
    }
    return(
        <main className="main">
            <p>Your shopping cart items</p>
            <ItemList items={props.items}/>
            <div>Total Amount: {props.totalAmount}</div>
            <div>Payment Info:</div>   
            <div className="paymentSection">
                <form className="payment-form" >
                    <input type="text" id="cardNumber" name="cardNumber" placeholder="Card number (16 digits)" className="payment cardNumber" value={cardNum} onChange={(e) => setCardNum(e.target.value)}/><br/>
                    <input type="text" id="expirationDate" name="expirationDate" placeholder="MMYY" className="payment" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}/><br/>
                    <input type="text" id="CVV" name="CVV" placeholder="CVV (3 digits)" className="payment cvv" value={cvv} onChange={(e) => setCvv(e.target.value)}/><br/>
                    <div class="warning" id="paymentWarning"></div>
                </form>
            </div>
            <button className="button-52" onClick={handleSubmit}>Place order</button> 
        </main>
    )
}

function Item(props) {
    return(
        <div className="individual-item">
            <h3>{props.name}</h3>
            <img className="item-image" src={props.image_url}/>
            <p>
                Price: {props.price}<br/>
                Quantity: {props.quantity}
            </p>
        </div>
    )
}

function ItemList(props) {
    const items = [];
    for (let item of props.items) {
        items.push(<Item name={item.name} image_url={item.image_url} price={item.price} quantity={item.quantity}/>)
    }
    return(
        <div className="shoppingCart" id="shopping-cart">
            {items}
        </div>
    )
}
export default Cart;