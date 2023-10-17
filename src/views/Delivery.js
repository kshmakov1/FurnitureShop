import {useState, useEffect} from "react";
import './styles/deliver.css';


function Delivery(props){
    const [stores, setStores] = useState();
    const [address, setAddress] = useState();
    const [dates, setDates] = useState();
    const [times, setTimes] = useState();

    const handleChange = (e) => {
        e.preventDefault();
        props.showInfo();
    }

    const showMap = (e) => {
        e.preventDefault();
        props.calculateRoute();
    }

    const hideOrderButton = (e) => {
        e.preventDefault();
        props.hideOrderButton();
    }

    const HideOrderButtonForDateAndTime = (e) => {
        e.preventDefault();
        props.HideOrderButtonForDateAndTime();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.deliver(stores, address, dates, times);
    }

    return(
        <main className="delivery" id="main">
            <h2><strong>Delivery</strong></h2>
            <form className="enterInfo" onChange={handleChange} onSubmit={handleSubmit}>
                Choose a Store Branch: 
                <select name='stores' id='stores' onChange={(e) => {hideOrderButton(e); setStores(e.target.value);}}>
                    <option value=""></option>
                    <option value='Yonge - Dundas, 350 Victoria St, Toronto, ON M5B 2K3' name='350 Victoria St, Toronto, ON M5B 2K3'>Yonge - Dundas, 350 Victoria St, Toronto, ON M5B 2K3</option>
                    <option value='Spadina, 1 Spadina Ave., Toronto, ON M5R 2S9' name='1 Spadina Ave., Toronto, ON M5R 2S9'>Spadina, 1 Spadina Ave., Toronto, ON M5R 2S9</option>
                    <option value='Bloor - Yonge, 2 Bloor St E, Toronto, ON M4W 1A8' name='2 Bloor St E, Toronto, ON M4W 1A8'>Bloor - Yonge, 2 Bloor St E, Toronto, ON M4W 1A8</option>
                </select><br/>

                Enter your Destination Address: 
                <input type="text" name='address' id='address' onChange={(e) => {hideOrderButton(e); setAddress(e.target.value);}}/><br/>

                Choose a Date and Time for Delivery: 

                <select name='dates' className='dates' id='dates' onChange={(e) => {HideOrderButtonForDateAndTime(e); setDates(e.target.value)}}>
                    <option value=""></option>
                    <option value={props.days[0]}>{props.days[0]}</option>
                    <option value={props.days[1]}>{props.days[1]}</option>
                    <option value={props.days[2]}>{props.days[2]}</option>
                    <option value={props.days[3]}>{props.days[3]}</option>
                    <option value={props.days[4]}>{props.days[4]}</option>
                </select>

                <select name='times' className='times' id='times' onChange={(e) => {HideOrderButtonForDateAndTime(e); setTimes(e.target.value)}}>
                    <option value=""></option>
                    <option value='10:00am'>10:00am</option>
                    <option value='11:00am'>11:00am</option>
                    <option value='12:00pm'>12:00pm</option>
                    <option value='1:00pm'>1:00pm</option>
                    <option value='2:00pm'>2:00pm</option>
                    <option value='3:00pm'>3:00pm</option>
                    <option value='4:00pm'>4:00pm</option>
                </select>
                <button id='checkRoute' onClick={showMap}>Check Route</button><br/>
                <input type='submit' value='Complete Delivery' name='Complete Delivery' id='orderButtonContainer'/><br/>
            </form>
            <div id='output' className='output'></div>
            <div id='map'></div>
        </main>
    )
}
export default Delivery;