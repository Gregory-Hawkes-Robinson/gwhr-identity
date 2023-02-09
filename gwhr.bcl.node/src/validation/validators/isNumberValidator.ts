import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsNumberValidator extends Validator {
    public name: string = "IsNumberValidator";
    public message: string = "{propertyName} is not a number";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "number") {
            return this.setError(ctx);
        }
        return true;
    }
}