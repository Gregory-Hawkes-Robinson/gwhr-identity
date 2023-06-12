import Debug from "../../system/diagnostics/debug";
import { Nullable } from "../../system/nullable";
import { ValidationRule } from "../validationRule";
import { Validator } from "../validators/validator";
import { Condition } from "./condition";

export class WithMessageCondition extends Condition {

    constructor(msg: string) {
        super(() => { return true });
        this.message = msg;
    }

    public name: string = "WithMessageCondition";
    public message: string;
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        Debug.writeLine("WithMessageCondition.validate");
        if (this.predicate()) {
            prev!.message = this.message;
            Debug.writeLine("prev.message:", prev!.message);
            Debug.writeLine("prev.name:", prev!.name);
            return true;
        }
        return false;
    }
}