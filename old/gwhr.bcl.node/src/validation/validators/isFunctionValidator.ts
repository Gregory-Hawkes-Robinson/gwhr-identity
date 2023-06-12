import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsFunctionValidator extends Validator {
    public name: string = "IsFunctionValidator";
    public message: string = "{propertyName} is not a function";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "function") {
            return this.setError(ctx);
        }
        return true;
    }
}