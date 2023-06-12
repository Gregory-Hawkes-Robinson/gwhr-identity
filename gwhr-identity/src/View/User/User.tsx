import { Link, NavLink, Outlet } from "react-router-dom";
import "./User.scss";

export function UserView() {
    return (<>
        <div className="user-view">
            <nav>
                <NavLink to="details">Details</NavLink>
                <NavLink to="roles">Roles</NavLink>
                <NavLink to="claims">Claims</NavLink>
                <NavLink to="sessions">Sessions</NavLink>
            </nav>
            <Outlet />
        </div>
    </>);
}