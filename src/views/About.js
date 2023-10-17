import './styles/about.css';

export function About() {
    return (
        <div className="main"> 
        <div>
            <div className="banner-image">                
                    <img className="logo" alt="Logo" src="SCSlogo1.png"></img>
                    <h1>The Team</h1>
                    <div className="flex-container">
                        <div className="flexbox-item">
                            <img className="profile-logo" alt="Logo" src="profileicon.png"></img><br />
                            AMANDA PHAM<br />
                            <div className="info">Co-founder of SCS,<br />Student at Toronto Metropolitan University</div><br />
                        </div>
                        <div className="flexbox-item">
                            <img className="profile-logo" alt="Logo" src="profileicon.png"></img><br />
                            KIRILL SHMAKOV<br />
                            <div className="info">Co-founder of SCS,<br />Student at Toronto Metropolitan University</div><br />
                        </div>
                        <div className="flexbox-item">
                            <img className="profile-logo" alt="Logo" src="profileicon.png"></img><br />
                            SANIA SYED<br />
                            <div className="info">Co-founder of SCS,<br />Student at Toronto Metropolitan University</div><br />
                        </div>
                        <div className="flexbox-item">
                            <img className="profile-logo" alt="Logo" src="profileicon.png"></img><br />
                            CASEY TALAMPAS<br />
                            <div className="info">Co-founder of SCS,<br />Student at Toronto Metropolitan University</div><br />
                        </div>
                        <div className="flexbox-item">
                            <img className="profile-logo" alt="Logo" src="profileicon.png"></img><br />
                            ANASTASIYA YUTSEVYCH<br />
                            <div className="info">Co-founder of SCS,<br />Student at Toronto Metropolitan University</div><br />
                        </div>
                    </div>                
            </div>
        </div>
    </div>
    )
}

export default About;