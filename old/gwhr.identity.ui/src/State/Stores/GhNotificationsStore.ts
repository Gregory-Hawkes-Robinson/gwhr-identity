import { makeAutoObservable } from "mobx";
import { IGhNotification } from "../Managers/GhNotificationsManager";

export class GhNotificationsStore {
    public constructor() {
        makeAutoObservable(this);
    }

    //#region Properties

    public notifications: IGhNotification[] = [];

    public get activeNotification() {

        console.log("Getting active notification...", this.notifications.length);

        if (this.notifications.length > 0) {
            return this.notifications[0];
        }
        return {} as IGhNotification;

    }

    //#endregion
}

const ghNotificationsStore: GhNotificationsStore = new GhNotificationsStore();
export default ghNotificationsStore;