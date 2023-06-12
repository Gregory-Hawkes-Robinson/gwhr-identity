import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsNotNullValidator extends Validator {
    public name: string = "IsNotNullValidator";
    public message: string = "{propertyName} is null";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (ctx.value == null) {
            return this.setError(ctx);
        }
        return true;
    }
}