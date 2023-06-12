import { makeAutoObservable } from "mobx";
import { IGhNotification } from "./IGhNotification";

export class GhNotificationsStore {
    public constructor() {
        makeAutoObservable(this);
    }

    //#region Properties 

    public notifications: IGhNotification[] = [];

    public get latest(): IGhNotification | undefined {
        return this.notifications[0];
    }

    //#endregion
}