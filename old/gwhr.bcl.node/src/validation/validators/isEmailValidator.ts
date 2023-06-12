import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsEmailValidator extends Validator {
    public name: string = "IsEmailValidator";
    public message: string = "{propertyName} is not a valid email address";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            return this.setError(ctx, "{propertyName} is not a string");
        }

        const regExp: RegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        if (regExp.test(ctx.value)) {
            return this.setError(ctx);
        }

        return true;
    }
}