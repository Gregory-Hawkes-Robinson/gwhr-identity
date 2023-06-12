import {Nullable} from "../../system/nullable";
import {ValidationRule} from "../validationRule";

export abstract class Validator {
    public abstract readonly name: string;
    public abstract message: string;

    public abstract validate<T, TProperty>(ctx: ValidationRule<T, TProperty>, prev: Nullable<Validator>): boolean;

    protected setError<T, TProperty>(ctx: ValidationRule<T, TProperty>, msg?: string): boolean {
        if (msg != null) {
            this.message = msg;
        }
        this.message = this.message.replace("{propertyName}", ctx.name).replace("{propertyValue}", ctx.value + "");
        return ctx.setError(this.message);
    }
}






