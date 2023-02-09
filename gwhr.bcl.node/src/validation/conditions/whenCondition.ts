import Debug from "../../system/diagnostics/debug";
import {Func} from "../../system/func";
import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "../validators/validator";
import {Condition} from "./condition";

export class WhenCondition extends Condition {
    public message: string = "";

    constructor(predicate: Func<boolean>) {
        super(predicate);
    }

    public name: string = "WithMessageCondition";

    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        Debug.writeLine("");
        return this.predicate();
    }
}