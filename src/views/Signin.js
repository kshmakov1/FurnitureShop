import {useState} from "react";
import './styles/signup.css'

function Signin(props) {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.onSubmit({userName, password});
    }

    return (
        <main className="signin">
            <form className="signup-form" onSubmit={handleSubmit}>
                <label>Please input username and password</label><br/>
                <input 
                    className="signup-input" 
                    type="text" 
                    name="userName" 
                    placeholder="Username" 
                    pattern="[a-zA-Z0-9]+" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Username must contain only letters and digits")}
                    onInput={(e) => e.target.setCustomValidity("")} >
                </input><br/><input 
                    className="signup-input" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    pattern="^[-@.\/#&+\w\s]*$" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Password must contain only letters, digits, spaces or the following characters:- , _, @, ., /, #, &, +")}
                    onInput={(e) => e.target.setCustomValidity("")} >
                </input><br/>

                <input type="submit" value="Sign in"></input><br/>
            </form>
        </main>
    )
}

export default Signin;