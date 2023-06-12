import { Func1 } from "../../system/func";
import { Nullable } from "../../system/nullable";
import { ValidationRule } from "../validationRule";
import { Validator } from "./validator";

export class MustValidator extends Validator {

    private readonly m_predicate: Func1<any, boolean>;

    constructor(predicate: Func1<any, boolean>) {
        super();
        this.m_predicate = predicate;
    }

    public name: string = "MustValidator";
    public message: string = "Must condition not met.";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (!this.m_predicate(ctx.value)) {
            return this.setError(ctx);
        }
        return true;
    }

}