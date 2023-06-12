import {Func2} from "../../system/func";
import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsNotEqualToValidator extends Validator {

    private m_valueToCompare: any;
    private m_comparer?: Func2<any, any, boolean>;

    constructor(valueToCompare: any, comparer?: Func2<any, any, boolean>) {
        super();
        this.m_valueToCompare = valueToCompare;
        this.m_comparer = comparer;
        this.message = `{propertyName} is not equal to ${this.m_valueToCompare}`;
    }

    public name: string = "IsEqualToValidator";
    public message: string = "";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (this.m_comparer != null) {
            if (this.m_comparer(ctx.value, this.m_valueToCompare)) {
                return this.setError(ctx);
            }
        }
        if (ctx.value === this.m_valueToCompare) {
            return this.setError(ctx);
        }

        return true;
    }
}