import "./Sidebar.scss";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  sidebarAnimation?: string;
  backgroundAnimation?: string;
  handleBackgroundClick?: () => void;
}

function Sidebar({
  sidebarAnimation,
  backgroundAnimation,
  handleBackgroundClick,
}: SidebarProps) {
  const handleBarClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <section
      className={"sidebar " + backgroundAnimation}
      onClick={handleBackgroundClick}
    >
      <div
        className={"sidebar__container " + sidebarAnimation}
        onClick={handleBarClick}
      >
        <nav className="sidebar__list" onClick={handleBackgroundClick}>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
            to="/"
            end
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
            to="/recipes"
          >
            My Recipes
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
            to="/groceries"
          >
            Grocery List
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "sidebar__link sidebar__link--active" : "sidebar__link"
            }
            to="/inventories"
          >
            Inventory List
          </NavLink>
        </nav>
      </div>
    </section>
  );
}

export default Sidebar;
