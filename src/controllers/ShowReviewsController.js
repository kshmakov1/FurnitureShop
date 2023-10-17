import { useState, useEffect } from "react";
import '../views/styles/review.css'

function ItemList() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost/cps630backend/retrieveAllItems.php')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    fetch(`http://localhost/cps630backend/retrieveReviews.php?itemId=${itemId}`)
      .then(response => response.json())
      .then(data => {
        setReviews(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div>
      <h2>Choose an item to view reviews:</h2>
      {items.length > 0 ? (
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} onClick={() => handleItemClick(item.id)} className="item-list li">
              {item.name} - ${item.price} <img src={item.image_url} alt={item.name} className="item-list li img" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found.</p>
      )}

      {selectedItem && (
        <div>
          <h2>Reviews for {items.find(item => item.id === selectedItem).name}:</h2>
          {reviews.length > 0 ? (
            <ul className="item-list">
              {reviews.map(review => (
                <li key={review.id} className="item-list li">
                  {review.comment} - {review.rating}/5
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews found for this item.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemList;
