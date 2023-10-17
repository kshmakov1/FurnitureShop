import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import ReviewForm from "../views/ReviewForm";
import "../views/styles/review.css";

function UserOrderItems() {
  const [orderItems, setOrderItems] = useState([]);
  const [cookies] = useCookies(['id']);
  const id = cookies.id;
  //const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/cps630backend/retrieveAll.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        setOrderItems(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const handleReviewClick = (itemId) => {
    // Redirect user to review page for selected item
    window.location.href = `/review/${itemId}`;
  }
  

  return (
    <div className="item-list">
      {orderItems.length > 0 ? (
        <ul>
          {orderItems.map(item => (
            <li key={item.id}>
              ID: {item.id} - {item.name} - ${item.price} <img src={item.image_url} alt={item.name} />
 
              <button onClick={() => handleReviewClick(item.id)}>Leave Review</button>
              {window.location.pathname === `/review/${item.id}` && (
                <ReviewForm />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found for this user.</p>
      )}
    </div>
  );
}

export default UserOrderItems;
