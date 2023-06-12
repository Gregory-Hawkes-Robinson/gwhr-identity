import { NavLink, Outlet } from "react-router-dom";
import "./Home.scss";

export function HomeView() {
    return (<>
        <div className="home">
            <nav>
                <NavLink to="/users" className={(isActive) => {
                    return isActive ? "active" : "";
                }}>Users0</NavLink>
                <NavLink to="/roles">Roles0</NavLink>
                <NavLink to="/claims">Claims0</NavLink>
            </nav>
            <Outlet />
        </div>
    </>);
}