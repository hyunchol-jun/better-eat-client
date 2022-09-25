import "./Sidebar.scss";
import {NavLink} from "react-router-dom";

function Sidebar({sidebarAnimation, backgroundAnimation}) {

    return (
        <section className={"sidebar " + backgroundAnimation}>
            <div className={"sidebar__container " + sidebarAnimation}>
                <nav className="sidebar__list">
                    <NavLink className={
                            ({ isActive }) => 
                                isActive ? "sidebar__link sidebar__link--active" 
                                            : "sidebar__link"
                        } to="/" end>
                        Search
                    </NavLink>
                    <NavLink className={
                            ({ isActive }) => 
                                isActive ? "sidebar__link sidebar__link--active" 
                                            : "sidebar__link"
                        } to="/recipes" end>
                        My Recipes
                    </NavLink>
                    <NavLink className={
                            ({ isActive }) => 
                                isActive ? "sidebar__link sidebar__link--active" 
                                            : "sidebar__link"
                        } to="/groceries" end>
                        Grocery List
                    </NavLink>
                    <NavLink className={
                            ({ isActive }) => 
                                isActive ? "sidebar__link sidebar__link--active" 
                                            : "sidebar__link"
                        } to="/inventories" end>
                        Inventory List
                    </NavLink>
                </nav>
            </div>
        </section>
    );
}

export default Sidebar;