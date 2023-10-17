import Search from "../views/Search";
import {useEffect, useState} from "react";
import SearchResult from "../views/SearchResult";

function SearchController() {
    const [result, setResult] = useState([])


    const handleSubmit=(formData)=>{
        fetch("http://localhost/cps630backend/search.php", {
            method: "POST",
            body: JSON.stringify(formData),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === 'error'){
                    alert('Wrong orderId or username');
                }
                else{
                setResult(JSON.parse(data));
                }// Handle the response data
            })
            .catch((error) => console.error(error));
    }


    return (
        <div>
        {result.length !== 0 ?(<SearchResult items={result[0]} trip={result[1]} />) : (
        < Search onSubmit = {handleSubmit} />)}
        </div>

    );

}
export default SearchController;