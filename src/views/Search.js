import {useState} from "react";
import './styles/search.css'

function Search(props) {
    const [userName, setUserName] = useState();
    const [orderId, setOrderId] = useState();

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.onSubmit({orderId,userName});

    }

    return (
        <main className="mainSearch">
            <form className="searchform" onSubmit={handleSubmit}>
                <label>Please put in Order Id and your username to search for your order</label><br/>
                <input className="search-input" type="text" name="orderId" placeholder="Order Id" pattern="[0-9]+" value={orderId} onChange={(e) => setOrderId(e.target.value)}></input><br/>
                <input className="search-input" type="text" name="username" placeholder="Username" pattern="[a-zA-Z0-9]+" value={userName} onChange={(e) => setUserName(e.target.value)}></input><br/>
                <input className='search-input' type="submit" value="Search"></input><br/>
            </form>
        </main>
    )
}

export default Search;