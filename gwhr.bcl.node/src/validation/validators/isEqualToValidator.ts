import {Func2} from "../../system/func";
import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";
import {Validator} from "./validator";

export class IsEqualToValidator extends Validator {

    private m_valueToCompare: any;
    private m_comparer?: Func2<any, any, boolean>;

    constructor(valueToCompare: any, comparer?: Func2<any, any, boolean>) {
        super();
        this.m_valueToCompare = valueToCompare;
        this.m_comparer = comparer;
    }

    public name: string = "IsEqualToValidator";
    public message: string = "{propertyName} is not a valid email address";
    public validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean {
        if (this.m_comparer != null) {
            if (!this.m_comparer(ctx.value, this.m_valueToCompare)) {
                return this.setError(ctx);
            }
        }
        if (ctx.value !== this.m_valueToCompare) {
            return this.setError(ctx);
        }

        return true;
    }
}