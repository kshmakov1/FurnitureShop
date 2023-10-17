import './styles/contact.css';

export function Contact() {
    return (
    <div className="main"> 
        <div>
            <div className="banner-image">                
                    <img className="logo" alt="Logo" src="SCSlogo1.png"></img>
                    <h1>Contact us!</h1>
                    <div className="flex-container">
                        <div className="flex-child">
                            AMANDA PHAM<br />
                            KIRILL SHMAKOV<br />
                            SANIA SYED<br />
                            CASEY TALAMPAS<br />
                            ANASTASIYA YUTSEVYCH
                        </div>
                        <div className="flex-child">
                            <a className="email" href="mailto:thaonguyen.pham@torontomu.ca?">&#9993; thaonguyen.pham@torontomu.ca</a><br />
                            <a className="email" href="mailto:kshmakov@torontomu.ca">&#9993; kshmakov@torontomu.ca</a><br />
                            <a className="email" href="mailto:sania.i.syed@torontomu.ca">&#9993; sania.i.syed@torontomu.ca</a><br />
                            <a className="email" href="mailto:casey.talampas@torontomu.ca">&#9993; casey.talampas@torontomu.ca</a><br />
                            <a className="email" href="mailto:anastasiya.yutsevych@torontomu.ca">&#9993; anastasiya.yutsevych@torontomu.ca</a><br />
                        </div>
                    </div>                
            </div>
        </div>
    </div>
    )
}

export default Contact;