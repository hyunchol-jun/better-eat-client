import "./PageHeader.scss";
import {Link, useLocation, NavLink} from "react-router-dom"
import menuIcon from "../../assets/icons/menu.svg";
import logoIcon from "../../assets/icons/logo.svg";
import closeIcon from "../../assets/icons/close.svg";

function PageHeader({handleClick, sidebarShown}) {
    const location = useLocation();

    return (
      <header className='page-header'>
        <button onClick={handleClick} className="page-header__menu">
            <img 
                className="page-header__icon"
                src={sidebarShown ? closeIcon : menuIcon} 
                alt="hamburger icon" 
                >
            </img>
        </button>
        <Link className="page-header__logo-container" to="/">
            <img className="page-header__logo" src={logoIcon} alt="logo icon"/>
            <span className='page-header__title'>BetterEat</span>
        </Link>
        <nav className="page-header__nav">
            <NavLink className={
                    ({ isActive }) => 
                        isActive ? "page-header__link page-header__link--active" 
                                    : "page-header__link"
                } to="/" end>
                Home
            </NavLink>
            <NavLink className={
                    ({ isActive }) => 
                        isActive ? "page-header__link page-header__link--active" 
                                    : "page-header__link"
                } to="/recipes" end>
                My Recipes
            </NavLink>
            <NavLink className={
                    ({ isActive }) => 
                        isActive ? "page-header__link page-header__link--active" 
                                    : "page-header__link"
                } to="/groceries">
                Grocery List
            </NavLink>
            <NavLink className={
                    ({ isActive }) => 
                        isActive ? "page-header__link page-header__link--active" 
                                    : "page-header__link"
                } to="/inventories">
                Inventory List
            </NavLink>
        </nav>
        <Link className="page-header__auth" to="/login">
            {location.pathname === "/signup" || location.pathname === "/login" ? "Login" : "Logout"}
        </Link>
      </header>
    );
}

export default PageHeader;