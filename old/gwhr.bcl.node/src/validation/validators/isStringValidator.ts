import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsStringValidator extends Validator {
    public name: string = "IsStringValidator";
    public message: string = "{propertyName} is not a string";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            return this.setError(ctx);
        }
        return true;
    }
}