import Shop from "../views/Shop";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { Cookies } from 'react-cookie';

function ShopController(){
    const [items, setItems] = useState([]);
    const [shoppingCartItems, setShoppingCartItems] = useState([]);
    const [shoppingCart, setShoppingCart] = useState([]);
    const [amount,setAmount]= useState(0);
    const navigate = useNavigate();
    const [itemsDisplayed, setItemsDisplayed] = useState([]);
    const [id, setId]=useState('');
    const [onSale, setOnSale] = useState(false);

    useEffect(()=> {
        const cookie = new Cookies();
        const idTemp = cookie.get("id");
        if (idTemp){
            setId(idTemp);
        }else{
            alert("Sign in to be able to save items to the shopping cart");
        }
        getItems();
    }, []);


    useEffect(()=> {
        const filteredItems = items.filter((item) => shoppingCart.includes(item.id))
        setShoppingCartItems(filteredItems);
    }, [shoppingCart]);

    const filterItemsSale= ()=>{
        const filteredItems = items.filter((item) => item.sale == 1);
        setItemsDisplayed(filteredItems);
    }

    const filterItems= (category)=>{
        const filteredItems = items.filter((item) => item.category === category);
        setItemsDisplayed(filteredItems);
    }
    const handleClick=(category='all')=>{
        if (category !== 'all') {
            if (category==='Sale') {
                setOnSale(true);
                filterItemsSale();
            }
            else {
                setOnSale(false);
                filterItems(category);
            }
        }
        else{
            setOnSale(false);
            setItemsDisplayed(items);
        }
    }

    const allowDrop= (ev)=>{
        ev.preventDefault();
    };

    const drag= (ev) =>{
        ev.dataTransfer.setData("text", ev.target.id);
    }

    const getItemPrice= (id)=>{
        const item = items.filter((item)=> item.id === id);
        return item[0].price;

    }
    const drop= (ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        setAmount(amount+parseInt(getItemPrice(data)));
        setShoppingCart([...shoppingCart, data]);

    }

    const saveCart = () => {
        if (id) {
            if (shoppingCart.length !== 0) {
                fetch("http://localhost/cps630backend/createCart.php", {
                    method: "POST",
                    body: JSON.stringify({cart: JSON.stringify(shoppingCart), amount: amount, id: id}),
                })
                    .then((response) => response.text())
                    .then((data) => {
                        if (data === 'error') {
                            alert("Sign in first to save your cart");
                        } else {
                            navigate("/cart");
                        }
                    })
                    .catch((error) => console.error(error));
            } else {
                alert("Add items to shopping cart first");
            }
        }
        else{
            alert("You cannot save the cart since you are not signed in")
        }
    }

    const getItems = () => {
        fetch("http://localhost/cps630backend/get.php", {
            method: "POST",
            body: JSON.stringify({query:"SELECT * from item"}),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Handle the response data
                setItems(JSON.parse(data));
                setItemsDisplayed(JSON.parse(data));
            })
            .catch((error) => console.error(error));

    }


    return(
        <div>
          <Shop items={itemsDisplayed} drag={drag} drop={drop} allowDrop={allowDrop} shoppingCartitems={shoppingCartItems} saveCart={saveCart} handleClick={handleClick} onSale={onSale}/>
        </div>
    )
}

export default ShopController;