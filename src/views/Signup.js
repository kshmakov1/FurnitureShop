import {useState} from "react";
import './styles/signup.css'

function Signup(props) {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        props.onSubmit({userName, password, firstName, lastName, address});
    }

    return (
        <main className="signup">
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
                </input><br/>
                <input 
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
                <label>Please input your first name and last name</label><br/>
                <input 
                    className="signup-input" 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    pattern="[a-zA-Z]+" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required
                    onInvalid={(e) => e.target.setCustomValidity("First name must contain only letters")}
                    onInput={(e) => e.target.setCustomValidity("")} >
                </input><br/>
                <input 
                    className="signup-input"
                    type="text" name="lastName" 
                    placeholder="Last Name" 
                    pattern="[a-zA-Z]+" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Last name must contain only letters")}
                    onInput={(e) => e.target.setCustomValidity("")} >
                </input><br/>
                <label>Please input your address</label><br/>
                <input 
                    className="signup-input" 
                    type="text" 
                    name="address" 
                    placeholder="Address" 
                    pattern="^[\.a-zA-Z0-9, ]*$" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Address may only contain letters, numbers, commas, periods and spaces")}
                    onInput={(e) => e.target.setCustomValidity("")} >
                </input><br/>

                <input type="submit" value="Sign up"></input><br/>
            </form>
        </main>
    )
}

export default Signup;