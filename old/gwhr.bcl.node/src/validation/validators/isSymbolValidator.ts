import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsSymbolValidator extends Validator {
    public name: string = "IsSymbolValidator";
    public message: string = "{propertyName} is not a Symbol";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "symbol") {
            return this.setError(ctx);
        }
        return true;
    }
}