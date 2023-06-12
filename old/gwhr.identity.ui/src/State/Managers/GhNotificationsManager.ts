import ghNotificationsStore, { GhNotificationsStore } from "../Stores/GhNotificationsStore";
import { GhManagerBase } from "./GhManagerBase";

export enum GhNotificationType {
    Information,
    Success,
    Warning,
    Error
}

export interface IGhNotification {
    type: GhNotificationType,
    name: string,
    description: string,
    icon: string,
    //actions: JSX.Element[];
}

export class GhNotificationsManager extends GhManagerBase<GhNotificationsStore>{

    //#region Properties 

    public store: GhNotificationsStore = ghNotificationsStore;

    //#endregion

    public async addAsync(notification: IGhNotification): Promise<void> {
        console.log("GhNotificationsManager.addAsync...");

        await this.brRunInAction(() => {
            this.store.notifications.unshift(notification);
        });

        setTimeout(async (): Promise<void> => {
            await this.removeAsync(notification);
        }, 2000);
    }

    public async removeAsync(notification: IGhNotification): Promise<void> {
        let idx: number = this.store.notifications.findIndex(x => x);
        if (idx === -1) {
            console.log("Unable to find notification");
            return;
        }

        await this.brRunInAction(() => {
            this.store.notifications.splice(idx, 1);
        });
    }

}
const ghNotificationsManager: GhNotificationsManager = new GhNotificationsManager();
export default ghNotificationsManager;