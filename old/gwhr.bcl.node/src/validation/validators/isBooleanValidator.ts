import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsBooleanValidator extends Validator {
    public name: string = "IsBooleanValidator";
    public message: string = "{propertyName} is not a boolean";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "boolean") {
            return this.setError(ctx);
        }
        return true;
    }
}