import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class HasMinLengthValidator extends Validator {
    private readonly m_minValue: number = 0;

    constructor(minValue: number) {
        super();
        this.m_minValue = minValue;
    }

    public name: string = "HasMinLengthValidator";
    public message: string = `{propertyName} must be a minumum of ${this.m_minValue} characters.`;

    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            return this.setError(ctx, "{propertyName} must be of type string.");
        }

        if (ctx.value.length < this.m_minValue) {
            return this.setError(ctx);
        }

        return true;
    }
}