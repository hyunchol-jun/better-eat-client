import "./PageHeader.scss";
import menuIcon from "../../assets/icons/menu.svg";
import IconButton from "../IconButton/IconButton";

function PageHeader({handleClick}) {
    return (
      <header className='page-header'>
        <IconButton className="page-header__menu" imgSrc={menuIcon} altText='hamburger icon' handleClick={handleClick}/>
        <span className='page-header__title'>BetterEat</span>
        <a className="page-header__auth" href="#">Login</a>
      </header>
    );
}

export default PageHeader;