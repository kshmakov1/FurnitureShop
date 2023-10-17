import './App.css';
import {Route, Routes} from "react-router-dom";
import Navigator from "./components/Navigator";
import Home from "./views/Home";
import Contact from "./views/Contact";
import About from "./views/About";
import SearchController from "./controllers/SearchController";
import ShopController from "./controllers/ShopController";
import MaintainController from "./controllers/MaintainController";
import SignupController from './controllers/SignupController';
import SigninController from './controllers/SigninController';
import CartController from './controllers/CartController';
import ReviewController from './controllers/ReviewController';
import ReviewForm from './views/ReviewForm';
import ShowReviewsController from './controllers/ShowReviewsController';
import DeliveryController from './controllers/DeliveryController';

function App() {
  return (
    <div>
      <Navigator/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<ShopController />} />
        <Route exact path="delivery" element={<DeliveryController />} />
        <Route exact path="signin" element={<SigninController />} />
        <Route exact path="signup" element={<SignupController />} />
        <Route exact path="cart" element={<CartController />} />
        <Route exact path="contact-us" element={<Contact />} />
        <Route exact path="about-us" element={<About />} />
        <Route exact path="search" element={<SearchController />} />
        <Route exact path="maintain" element={<MaintainController />} />
        <Route exact path="review/:id" element={<ReviewForm />} />
        <Route exact path="review" element={<ReviewController />} />
        <Route exact path="item-review" element={<ShowReviewsController />} />
      </Routes>
    </div>
  );
}

export default App;
