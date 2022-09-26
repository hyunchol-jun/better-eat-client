import "./PageHeader.scss";
import {Link, useLocation} from "react-router-dom"
import menuIcon from "../../assets/icons/menu.svg";
import IconButton from "../IconButton/IconButton";
import logoIcon from "../../assets/icons/logo.svg";
import closeIcon from "../../assets/icons/close.svg";

function PageHeader({handleClick, sidebarShown}) {
    const location = useLocation();

    return (
      <header className='page-header'>
        <IconButton 
            className="page-header__menu" 
            imgSrc={sidebarShown ? closeIcon : menuIcon} 
            altText='hamburger icon' 
            handleClick={handleClick}
        />
        <Link className="page-header__logo-container" to="/">
            <img className="page-header__logo" src={logoIcon} alt="logo icon"/>
            <span className='page-header__title'>BetterEat</span>
        </Link>
        <Link className="page-header__auth" to="/login">
            {location.pathname === "/signup" || location.pathname === "/login" ? "Login" : "Logout"}
        </Link>
      </header>
    );
}

export default PageHeader;