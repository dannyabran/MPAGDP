import { Link } from "react-router-dom";
import Logo from "../pages/img/MPAGDP_logo.svg";

const Header = ({}) =>{

    return (
        <nav className="header">
            <Link to="/">
                <img src={Logo} alt="Logo" className="logo" />
            </Link>
            <div className="nav">
                <Link to="/Recolha">Recolha</Link>
                    
                <Link to="/Divulgação">Divulgação</Link>
                   
                <Link to="/remistura">Remistura</Link>
            </div>
        </nav>
    );
};

export default Header;