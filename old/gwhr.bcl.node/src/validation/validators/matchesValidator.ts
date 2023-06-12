import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class MatchesValidator extends Validator {
    public message: string = "";

    private m_regExp: RegExp;

    constructor(regExp: RegExp) {
        super();
        this.m_regExp = regExp;
    }

    public name: string = "MatchesValidator";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (typeof ctx.value !== "string") {
            ctx.setError(`${ctx.name} is not a string.`);
            return false;
        }

        if (!this.m_regExp.test(ctx.value as any)) {
            ctx.setError(`${this.name} does not match expression ${this.m_regExp}`);
            return false;
        }

        return true;
    }
}
