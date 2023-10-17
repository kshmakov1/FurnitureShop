import './styles/maintain.css';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
function Maintain(props){
    const action = props.selected.action;
    const table = props.selected.table;
    const firstpart= props.input.firstPart;
    const second = props.input.secondPart;

    const handleChangeAction = (ev) => {
        props.handleChangeAction(ev.value)
    }
    const handleChangeTable = (ev) => {
        props.handleChangeTable(ev.value)
    }
    const handleSubmit= (ev) =>{
        ev.preventDefault();
        props.handleSubmit();
    }
    const options1= [
        {value: 'SELECT', label:'View entries'},
        {value:'INSERT', label: 'Add the entry to the table'},
        {value:'DELETE', label: 'Delete an entry from the table'},
        {value:'UPDATE', label:'Edit an entru in the table'}
    ]

    const options2=[
        {value:'web_user',label:'Web_user'},
        {value:'purchase_order',label:'Purchase_order'},
        {value:'truck', label:'truck'},
        {value:'trip', label:'trip'},
        {value:'store', label:'store'},
        {value:'on_hold', label:'on_hold'},
        {value:'item', label:'item'},
        {value:'includes', label:'includes'},
        {value:'cart', label:'cart'}
    ]


    return(
        <div className='dbLayout'>
            <form className="addDB">
                <div className="dropdowns">
                <label>Which transaction you would like to execute</label><br/>
                <Dropdown  className='selectInput' options={options1} onChange={(e)=>handleChangeAction(e)} value={action} defaultOption={options1[0]}/>
                <label>Which table you would like to execute it on</label><br/>
                <Dropdown  className='selectInput' options={options2} onChange={(e)=>handleChangeTable(e)} value={table} defaultOption={options2[0]}/>
                </div>
                <div >
                    {action !== 'INSERT' && table !== '' ? <div className='dbInput' >
                            <span>{action} {action === 'UPDATE' ? ` ${table} SET` : ''}</span>
                            {action === 'DELETE'? '' :  <input className='parts' name='firstPart' type='text' value={firstpart} onChange={(e)=> props.handleChangeFirst(e.target.value)}></input> }
                            <span> {action === 'UPDATE' ? 'WHERE' : ` FROM ${table} WHERE`}</span>
                        <input className='parts' name='secondPart' type='text' value={second} onChange={(e)=> props.handleChangeSecond(e.target.value)}></input>
                        </div>
                        : <div className='dbInput'>
                            <span>{action} INTO {table} (</span>
                            <input className='parts' name='firstPart' type='text' value={firstpart} onChange={(e)=> props.handleChangeFirst(e.target.value)}></input>
                            <span>) VALUES( </span>
                            <input className='parts' name='secondPart' type='text' value={second} onChange={(e)=> props.handleChangeSecond(e.target.value)}></input>
                            <span>)</span>
                        </div>}
                </div>
                <input type="submit" className='execute' value="Execute" onClick={(e)=> handleSubmit(e)}></input><br/>
            </form>
        </div>
    )
}

export default Maintain;