import { observer } from "mobx-react";
import "./GhNotificationControl.scss";
import React, { ReactNode, useState } from "react";
import { ReactComponent as IconTenant } from '../../Icons/Icon-Tenant.svg';


export const GhNotificationControl = observer((): JSX.Element => {

    //#region Render methods

    return (
        <div className="GhNotificationControl">
            {/* status color */}
            <div className="status-container info">
                <IconTenant />
            </div>
            {/* Text holder */}
            <div className="text-container">
                <span className="name">Name goes here</span>
                <span className="description">Description goes here</span>
            </div>
            {/* Actions holders */}
            <div></div>
        </div>
    );

    //#endregion
});