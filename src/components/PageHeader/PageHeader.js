import "./PageHeader.scss";
import menuIcon from "../../assets/icons/menu.svg";

function PageHeader() {
    return (
      <header className='page-header'>
        <button className='page-header__menu icon-button'><img src={menuIcon} alt='hamburger icon'/></button>
        <span className='page-header__title'>BetterEat</span>
        <a className="page-header__auth" href="#">Login</a>
      </header>
    );
}

export default PageHeader;