import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsNullValidator extends Validator {
    public message: string = "{propertyName} is not null";
    public name: string = "IsNullValidator";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (ctx.value == null) {
            return this.setError(ctx);
        }
        return true;
    }
}