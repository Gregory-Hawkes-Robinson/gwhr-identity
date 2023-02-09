import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsBigIntValidator extends Validator {
    public name: string = "IsBigIntValidator";
    public message: string = "{propertyName} is not a BigInt";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "bigint") {
            return this.setError(ctx);
        }
        return true;
    }
}