import './styles/shop.css';

function Shop(props) {
    const items = props.items;
    const shoppingCartItems = props.shoppingCartitems;
    const onSale = props.onSale;
    
    return (
        <div className="nameShop">
            <div className="categories">
                Categories
                <ul className="categoryList">
                    <li className="couch category" onClick={(e)=> props.handleClick('Couch')}>- Couches</li>
                    <li className="chair category" onClick={(e)=> props.handleClick('Chair')}>- Chairs</li>
                    <li className="table category" onClick={(e)=> props.handleClick('Table')}>- Tables</li>
                    <li className="bedframe category" onClick={(e)=> props.handleClick('Bedframe')}>- Bed frames</li>
                    <li className="sale category" onClick={(e)=> props.handleClick('Sale')}>- Sale</li>
                    <li className="all category" onClick={(e)=> props.handleClick()}>- Browse all</li>
                </ul>
            </div>
            {onSale && 
                (
                <div id="itemList">
                {items.map((item)=>
                    <div className="individual-item" id={item.id} draggable = 'true'>{item.name}
                        <p className="mark-down">Price: {item.original_price} CAD</p>
                        <p className="sale-price"><b>SALE {item.price} CAD</b></p>
                        <img alt="item image" className="item-image" id={item.id} src = {item.image_url} draggable="true" onDragStart={(e)=>props.drag(e)}/>
                    </div>
                )}
                </div> 
                )
            }
            {!onSale &&
                (
                <div id="itemList">
                {items.map((item)=>
                    <div className="individual-item" id={item.id} draggable = 'true'>{item.name}
                        <p>Price: {item.price} CAD</p>
                        <img alt="item image" className="item-image" id={item.id} src = {item.image_url} draggable="true" onDragStart={(e)=>props.drag(e)}/>
                    </div>
                    )}
                </div> 
                )
            }
            <div className="shoppingCartSection">
                Shopping cart
                <div className="shoppingCart" id="shoppingCart" onDragOver={(e)=> props.allowDrop(e)} onDrop={(e)=> props.drop(e)}>
                    {shoppingCartItems.map((item)=>
                        <div className="individual-item-cart" id={item.id} draggable = 'true'>{item.name}
                            <p>Price: {item.price} CAD</p>
                            <img alt="item image" className="item-image-small" id={item.id} src = {item.image_url} draggable="true" onDragStart={(e)=>props.drag(e)}/>
                        </div>
                    )}
                </div>
                <button className="button-52" onClick={props.saveCart}>Save my shopping cart</button>
            </div>
        </div>
    )
}

export default Shop;