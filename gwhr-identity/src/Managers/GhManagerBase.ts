import { runInAction } from "mobx";

export abstract class GhManagerBase<T extends object> {

    public abstract store: T;

    public async setStateAsync(newState: Partial<T>): Promise<void> {
        return new Promise((resolve: (value: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => {
            try {
                runInAction(() => {
                    Object.assign(this.store, { ...newState });
                });
                resolve();
            } catch (error) {
                reject();
            }
        });
    }

    public async ghRunInActionAsync(callBack: () => void | Promise<void>): Promise<void> {
        return new Promise(async (resolve: (value: void | PromiseLike<void>) => void, reject: (reason?: any) => void) => {
            try {
                await runInAction(async () => {
                    await callBack();
                });
                resolve();
            } catch (error) {
                reject();
            }
        });
    }
}