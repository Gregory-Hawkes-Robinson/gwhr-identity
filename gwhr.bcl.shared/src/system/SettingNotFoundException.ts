import { Exception } from "./exception";

export class SettingNotFoundException extends Exception {
    public constructor(msg = "") {
        super(`${msg} Setting not found`);
    }
}