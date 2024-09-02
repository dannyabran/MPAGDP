import { Link } from "react-router-dom";
import Logo from "../pages/img/MPAGDP_logo.svg";


const Footer = ({}) =>{

    return (
        <div className="Footer">
            <div classname="footer-container">
                <div className="info-site">
                    <img src={Logo} alt="Logo" className="logo" />
                    <div className="outros-projetos">   
                        <img src="../pages/img/cigana 1.png" alt="A Música Cigana a Gostar dela propria" className="cigana" />    
                        <img src="../pages/img/comida 1.png" alt="A comida portuguesa a Gostar dela propria" className="comida" /> 
                        <img src="../pages/img/gravar 1.png" alt="A Música portuguesa a grava-se a ela propria" className="gravar" /> 
                        <img src="../pages/img/iberica 1.png" alt="A Música ibérica a Gostar dela propria" className="iberica" />
                    </div>
                </div>
                <div className="info-cont">
                    <div className="info">
                        <p>Rua José Simões cortez 1 <br></br> 3200-329 Serpins</p>
                        <div className="site-nav">
                            <div>
                                <Link to="/Recolha">Recolha</Link>
                                <Link to="/Divulgação">Divulgação</Link>  
                                <Link to="/remistura">Remistura</Link>
                            </div>
                            <div>
                                <Link to="https://www.facebook.com/amusicaportuguesaagostardelapropria">Facebook</Link>
                                <Link to="https://www.instagram.com/mpagdp/">Instagram</Link>
                                <Link to="https://vimeo.com/mpagdp">Vimeo</Link>
                            </div>
                        </div>
                    </div>
                    <p>© 2024 Todos os Direitos Reservados</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;