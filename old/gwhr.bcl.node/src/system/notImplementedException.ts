import {Exception} from "./exception";

export class NotImplementedException extends Exception {
    constructor(msg: string = "The method or operation is not implemented") {
        super(msg);
    }
}