import Signin from "../views/Signin.js";
import {useEffect, useState} from "react";

function SigninController(){
    const [submitted, setSubmitted]= useState(false);
    const [result, setResult] = useState();

    const handleSubmit=(formData)=>{
        fetch("http://localhost/cps630backend/signinfunction.php", {
            method: "POST",
            body: JSON.stringify(formData),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data === 'error'){
                    alert('Wrong username or password');
                }
                else{
                    const parsedData = JSON.parse(data);
                    setResult(parsedData);
                    document.cookie = `id=${parsedData.id}`;
                    setSubmitted(true);
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <div>
        {submitted ?(<div>You have signed in successfully!</div>) : (
        <Signin onSubmit={handleSubmit} />)}
        </div>

    );
}

export default SigninController;
