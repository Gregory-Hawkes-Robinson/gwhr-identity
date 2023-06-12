import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsGreaterThanValidator extends Validator {
    private readonly m_value: number = 0;

    constructor(value: number) {
        super();
        this.m_value = value;
    }

    public name: string = "GreaterThanValidator";
    public message: string = `{propertyName} must be greater than ${this.m_value}.`;

    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "number") {
            return this.setError(ctx, "{propertyName} must be of type number.");
        }

        if (ctx.value <= this.m_value) {
            return this.setError(ctx);
        }

        return true;
    }
}