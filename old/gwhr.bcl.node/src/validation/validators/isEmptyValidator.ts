import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsEmptyValidator extends Validator {
    public name: string = "IsEmptyValidator";
    public message: string = "{propertyName} is not empty";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            this.setError(ctx, `{propertyName} is not a string.`);
            return false;
        }
        if (ctx.value.length > 0) {
            this.setError(ctx);
            //ctx.setError(`${ctx.name} is not empty.`);
            return false;
        }
        return true;
    }
}
