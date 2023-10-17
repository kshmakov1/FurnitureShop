import { useState } from "react";
import { useCookies } from "react-cookie";
import './styles/reviewForm.css'

function ReviewForm() {
    const itemId = window.location.pathname.split("/").pop();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [cookies] = useCookies(['id']);
    const userId = cookies.id;

    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit review data to backend server
        fetch("http://localhost/cps630backend/submitReview.php", {
            method: "POST",
            body: JSON.stringify({ itemId, rating, comment, userId }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Optionally handle success response
            })
            .catch((error) => {
                console.error(error); // Optionally handle error
            });
        // Clear form fields
        setRating(0);
        setComment("");
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label className="form-label">
                Rating:
                <input
                    className="form-input"
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    required
                />
            </label>
            <br />
            <label className="form-label">
                Comment:
                <textarea
                    className="form-input"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    required
                />
            </label>
            <br />
            <button className="form-submit-btn" type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;