import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsNotEmptyValidator extends Validator {
    public name: string = "IsNotEmptyValidator";
    public message: string = "{propertyName} is emptu";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            return this.setError(ctx, "{propertyName} is not a string");
        }
        if (ctx.value.length === 0) {
            return this.setError(ctx);
        }

        return true;
    }
}