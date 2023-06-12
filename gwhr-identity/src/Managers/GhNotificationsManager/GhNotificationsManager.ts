import { GhManagerBase } from "../GhManagerBase";
import { GhNotificationsStore } from "./GhNotificationsStore";
import { IGhNotification } from "./IGhNotification";

export class GhNotificationsManager extends GhManagerBase<GhNotificationsStore>{

    public store: GhNotificationsStore = new GhNotificationsStore();

    //#region Methods

    public async addAsync(notification: IGhNotification): Promise<void> {
        console.log("GhNotificationsManager.addAsync...");

        await this.ghRunInActionAsync(() => {
            this.store.notifications.unshift(notification);
        });

        setTimeout(async (): Promise<void> => {
            await this.removeAsync(notification);
        }, 2000);
    }

    public async removeAsync(notification: IGhNotification): Promise<void> {
        let idx: number = this.store.notifications.findIndex(x => x === notification);
        if (idx === -1) {
            console.log("Unable to find notification");
            return;
        }

        await this.ghRunInActionAsync(() => {
            this.store.notifications.splice(idx, 1);
        });
    }

    //#endregion

}