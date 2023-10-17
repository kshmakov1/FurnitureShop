import './styles/itemsList.css'

function SearchResult(props) {

    const items = props.items;
    const trip = props.trip;

    return (
        <div>
            <h2 className='title'>You ordered the following items:</h2>
        <main className="mainList">
            {items.map((item)=>
                <div className="individual-item" id={item.id} draggable = 'true'>
                    <p>Item: {item.name}</p>
                    <p>Price: {item.price} CAD</p>
                    <img alt="item-image" className="item-image" id={item.id} src = {item.image_url}/>
                </div>
            )}

        </main>
            {typeof(trip) !== "undefined" ? <div>
                <h2 class = 'title'>Your delivery details: </h2>
                <div class = 'title'>Your delivery is scheduled for {trip.deliveryDate} at {trip.deliveryTime} from the {trip.storeName} on {trip.storeAddress}</div>
                <div class = 'title'>Please contact us if you would like to make changes to your order</div></div> : <p>Delivery is not specified for this order yet</p>
            }
        </div>
    )
}

export default SearchResult;