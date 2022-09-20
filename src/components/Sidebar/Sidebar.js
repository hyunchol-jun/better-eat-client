import "./Sidebar.scss";
import {NavLink} from "react-router-dom";

function Sidebar() {

    return (
        <section className="sidebar">
            <div className="sidebar__container">
                <nav>
                    <ul className="sidebar__list">
                        <li className="sidebar__item">
                            <NavLink className="sidebar__link">Search</NavLink>
                        </li>
                        <li className="sidebar__item">
                            <NavLink className="sidebar__link">My Recipes</NavLink>
                        </li>
                        <li className="sidebar__item">
                            <NavLink className="sidebar__link">Grocery List</NavLink>
                        </li>
                        <li className="sidebar__item">
                            <NavLink className="sidebar__link">Inventory List</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default Sidebar;