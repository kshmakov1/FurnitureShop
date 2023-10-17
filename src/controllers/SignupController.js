import Signup from "../views/Signup.js";
import {useEffect, useState} from "react";

function SignupController(){
    const [submitted, setSubmitted]= useState(false)
    
    const handleSubmit=(formData)=>{
        fetch("http://localhost/cps630backend/insert.php", {
            method: "POST",
            body: JSON.stringify(formData),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === 'error'){
                    alert('This username is taken');
                } else if (data === 'failed connection'){
                    alert('Sign up failed');
                } else {
                    setSubmitted(true);
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <div>
        {submitted ?(<div>You have created an account!</div>) : (
        <Signup onSubmit={handleSubmit} />)}
        </div>

    );
}

export default SignupController;
