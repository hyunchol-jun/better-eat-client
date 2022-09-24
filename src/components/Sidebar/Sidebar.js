import "./Sidebar.scss";
import {NavLink} from "react-router-dom";

function Sidebar() {

    return (
        <section className="sidebar">
            <div className="sidebar__container">
                <nav>
                    <ul className="sidebar__list">
                        <li className="sidebar__item">
                            <NavLink className={
                                    ({ isActive }) => 
                                        isActive ? "sidebar__link sidebar__link--active" 
                                                 : "sidebar__link"
                                } to="/" end>
                                Search
                            </NavLink>
                        </li>
                        <li className="sidebar__item">
                            <NavLink className={
                                    ({ isActive }) => 
                                        isActive ? "sidebar__link sidebar__link--active" 
                                                 : "sidebar__link"
                                } to="/recipes" end>
                                My Recipes
                            </NavLink>
                        </li>
                        <li className="sidebar__item">
                            <NavLink className={
                                    ({ isActive }) => 
                                        isActive ? "sidebar__link sidebar__link--active" 
                                                 : "sidebar__link"
                                } to="/groceries" end>
                                Grocery List
                            </NavLink>
                        </li>
                        <li className="sidebar__item">
                            <NavLink className={
                                    ({ isActive }) => 
                                        isActive ? "sidebar__link sidebar__link--active" 
                                                 : "sidebar__link"
                                } to="/inventories" end>
                                Inventory List
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default Sidebar;