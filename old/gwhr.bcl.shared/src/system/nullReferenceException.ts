import {Exception} from "./exception";

export class NullReferenceException extends Exception {
    public constructor() {
        super("Object reference not set to an instance of an object");
    }
}