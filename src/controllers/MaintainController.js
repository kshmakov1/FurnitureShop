import {useState, useEffect} from "react";
import Maintain from "../views/Maintain";
import {Cookies} from 'react-cookie';
import {useNavigate} from "react-router-dom";


function  MaintainController() {
    const [selected, setSelected] = useState({action: 'SELECT', table:'web_user'})
    const [input, setInput] = useState({firstPart:'', secondPart:''});
    const [result, setResult] = useState([]);
    const cookie = new Cookies();
    const userId = cookie.get("id");
    const navigate = useNavigate();

    useEffect(() => {
        if (userId == undefined) {
            alert("Sign in first to get access");
            navigate("/signin");
        }
        fetch("http://localhost/cps630backend/get.php", {
            method: "POST",
            body: JSON.stringify({query: "SELECT admin FROM web_user WHERE id=" + userId}),
        })
            .then((response) => response.text())
            .then((data) => {
                //console.log(JSON.parse(data));
                if(JSON.parse(data)[0].admin != "1") {
                    alert("Access denied");
                    navigate("/signin");
                }
            })
            .catch((error) => console.error(error));
        
    });

    const handleChangeAction=(ev)=>{
        setSelected({...selected,action: ev});
    }

    const handleChangeTable=(ev)=>{
        setSelected({...selected,table: ev});
    }

    const handleChangeFirst= (ev)=>{
        setInput({...input, firstPart: ev});
    }
    const handleChangeSecond= (ev)=>{
        setInput({...input, secondPart: ev});
    }

    const getItems = (query) => {
        fetch("http://localhost/cps630backend/get.php", {
            method: "POST",
            body: JSON.stringify({query:query}),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Handle the response data
                setResult(JSON.parse(data))
            })
            .catch((error) => console.error(error));

    }

    const insertDeleteUpdate = (query) => {
        fetch("http://localhost/cps630backend/insertUpdateDelete.php", {
            method: "POST",
            body: JSON.stringify({query:query}),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data); // Handle the response data
                if (data !== ''){
                    alert('Query executed successfully')
                }
                else{
                    alert('Something went wrong check your inputs are unique or if you are deleting an entry it is likely other entries in tables contain foreign key of that entry')
                }
            })
            .catch((error) => alert(error));
    }
    const handleSubmit=()=>{
        let query= ''
        if (selected.action === 'INSERT') {
            query=`${selected.action} INTO ${selected.table} (${input.firstPart}) VALUES (${input.secondPart})`
            console.log(query);
            insertDeleteUpdate(query);
        }
        if (selected.action=== 'SELECT'){
                if(input.secondPart.length !== 0){
                    query= `${selected.action} ${input.firstPart} FROM ${selected.table} WHERE ${input.secondPart}`
                }
                else{
                    query= `${selected.action} ${input.firstPart} FROM ${selected.table}`
                }
                getItems(query);
        }
        if (selected.action ==='UPDATE'){
            query=`${selected.action} ${selected.table} SET ${input.firstPart} WHERE ${input.secondPart}`;
            console.log(query);
            insertDeleteUpdate(query);
        }
        if (selected.action === 'DELETE'){
            query=`${selected.action} FROM ${selected.table} WHERE ${input.secondPart}`
            console.log(query);
            insertDeleteUpdate(query);
        }
    }
    return (
        <div>
            <Maintain selected={selected} handleChangeAction={handleChangeAction} handleChangeTable={handleChangeTable} input ={input} handleChangeFirst={handleChangeFirst} handleChangeSecond={handleChangeSecond} handleSubmit={handleSubmit}/>
            {result.map((obj, index) => (
                <li key={index}>
                    {Object.keys(obj).map(key => (
                        <span key={key}>{key} : {obj[key]} </span>
                    ))}
                </li>
            ))}
        </div>

    );

}
export default MaintainController;