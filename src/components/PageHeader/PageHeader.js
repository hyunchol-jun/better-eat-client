import "./PageHeader.scss";
import {Link, useLocation} from "react-router-dom"
import menuIcon from "../../assets/icons/menu.svg";
import IconButton from "../IconButton/IconButton";

function PageHeader({handleClick}) {
    const location = useLocation();

    return (
      <header className='page-header'>
        <IconButton className="page-header__menu" imgSrc={menuIcon} altText='hamburger icon' handleClick={handleClick}/>
        <span className='page-header__title'>BetterEat</span>
        <Link className="page-header__auth" to="/login">
            {location.pathname === "/signup" || location.pathname === "/login" ? "Login" : "Logout"}
        </Link>
      </header>
    );
}

export default PageHeader;