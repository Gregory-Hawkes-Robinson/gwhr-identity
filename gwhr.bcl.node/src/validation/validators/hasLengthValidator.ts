import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class HasLengthValidator extends Validator {
    private readonly m_minValue: number = 0;
    private readonly m_maxValue: number = 0;

    constructor(minValue: number, maxValue: number) {
        super();
        this.m_minValue = minValue;
        this.m_maxValue = maxValue;
    }

    public name: string = "HasLengthValidator";
    public message: string = `{propertyName} must be within ${this.m_minValue} and ${this.m_maxValue}.`;
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            return this.setError(ctx, "{propertyName} must be of type string.");
        }
        if (this.m_minValue > this.m_maxValue) {
            return this.setError(ctx, "The maximum value should be larger than the minimum value");
        }

        if (ctx.value.length > this.m_maxValue || ctx.value.length < this.m_minValue) {
            return this.setError(ctx);
        }

        return true;
    }
}