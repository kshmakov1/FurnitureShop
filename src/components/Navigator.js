import {Link} from "react-router-dom";

function Navigator ()  {
    return (
        <nav className='navigator'>
            <Link className='link_navigation' to="/">Home</Link>
            <Link className='link_navigation' to="/signin">Sign in</Link>
            <Link className='link_navigation' to="/signup">Sign up</Link>
            <Link className='link_navigation' to="/shop">Shop</Link>
            <Link className='link_navigation' to="/cart">Shopping cart</Link>
            <Link className='link_navigation' to='/delivery'>Deliver</Link>
            <Link className='link_navigation' to="/search">Search</Link>
            <Link className='link_navigation' to="/review">Review</Link>
            <Link className='link_navigation' to="/item-review">Item Reviews</Link>
            <Link className='link_navigation' to='/about-us'>About us</Link>
            <Link className='link_navigation' to="/contact-us">Contact us</Link>
        </nav>
    )
}

export default Navigator;