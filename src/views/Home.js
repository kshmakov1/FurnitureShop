import '../App.css';
import './styles/home.css'
import {brdetect} from "../controllers/BrowserCompatibilityController";
import {useNavigate} from "react-router-dom";

function Home(){
    const navigate = useNavigate();
    function handleClick() {
        brdetect();
    }

    function handleNavigate(){
        navigate('/shop');
    }

    return(
            <main className='mainHome'>
                <h3>Our mission</h3>
                <p>Considering the traffic as a serious threat to the quality of life these years, the world has been
                    looking
                    for various solutions to decrease the stress, frustration, delays and terrible air pollutions being
                    caused through it. SCS
                    attempts to provide a smart green solution on this regard by providing online shopping services and then
                    delivery of the
                    purchased items from the warehouses selected/close to the destination address</p>
                <button className="button-52" onClick={handleNavigate}>Start shopping</button>
                <button id='browser' onClick={handleClick}>Show Browser Info</button><br/>
            </main>
    )
}

export default Home;