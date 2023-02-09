import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class HasMaxLengthValidator extends Validator {
    private readonly m_maxValue: number = 0;

    constructor(maxValue: number) {
        super();
        this.m_maxValue = maxValue;
    }

    public name: string = "HasMaxLengthValidator";
    public message: string = `{propertyName} must less than ${this.m_maxValue}.`;

    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            return this.setError(ctx, "{propertyName} must be of type string.");
        }

        if (ctx.value.length > this.m_maxValue) {
            return this.setError(ctx);
        }

        return true;
    }
}