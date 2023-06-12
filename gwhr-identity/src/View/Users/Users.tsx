import { NavLink, Outlet } from "react-router-dom";
import "./Users.scss";
import { VirtualListControl } from "../../Components/VirtualList/VirtualListControl";

export function UsersView(): JSX.Element {
    return (<>
        <div className="users-view">
            {/* <div className="master">User list here</div> */}

            <div className="detail">
                <Outlet />
            </div>
        </div>
    </>);
}