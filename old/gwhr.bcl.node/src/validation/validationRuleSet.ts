import { Func1 } from "../system/func";
import arrayUtils from "../utilities/arrayUtils";
import { ValidationResult } from "./validationResult";
import { ValidationRule } from "./validationRule";


export class ValidationRuleSet<T> {

    private m_throwOnError: boolean = false;

    public constructor(rules?: ValidationRule<T, any>[]) {

        if (rules != null) {
            rules.forEach((rule: ValidationRule<T, any>) => {
                this.rules.push(rule);
            });
        }

    }

    public rules: ValidationRule<T, any>[] = [];

    public get isValid(): boolean {
        return arrayUtils.all(this.rules, x => x.isValid);
    }

    public throwOnError(): ValidationRuleSet<T> {
        this.m_throwOnError = true;
        return this;
    }

    public ruleFor(obj: T, accessor: Func1<T, any>, name: keyof T | null): ValidationRule<T, any> {
        const rule: ValidationRule<T, any> = new ValidationRule(accessor(obj), typeof name === 'string' ? name : "");
        this.rules.push(rule);
        return rule;
    }

    public validate(): ValidationResult {
        for (let i: number = 0; i < this.rules.length; i++) {
            const rule: ValidationRule<T, any> = this.rules[i];
            rule.validate();
        }
        if (this.isValid) {
            return new ValidationResult([]);
        }
        const result: ValidationResult = new ValidationResult(arrayUtils.removeNulls(this.rules.map(x => x.error)));
        if (this.m_throwOnError) {
            //throw new BwValidationException(result.errorMessage);
        }
        return result;
    }
}