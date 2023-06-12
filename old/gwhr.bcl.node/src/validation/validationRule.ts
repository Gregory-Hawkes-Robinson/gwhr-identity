import {Func, Func1, Func2} from "../system/func";
import Debug from "../system/diagnostics/debug";
import {Validator} from "./validators/validator";
import {IsStringValidator} from "./validators/isStringValidator";
import {IsNotNullValidator} from "./validators/isNotNullValidator";
import {IsNullValidator} from "./validators/isNullValidator";
import {IsEmptyValidator} from "./validators/isEmptyValidator";
import {IsNotEmptyValidator} from "./validators/isNotEmptyValidator";
import {IsEmailValidator} from "./validators/isEmailValidator";
import {WithMessageCondition} from "./conditions/withMessageCondition";
import {WhenCondition} from "./conditions/whenCondition";
import {Condition} from "./conditions/condition";
import {ValidationFailure} from "./validationFailure";
import {ValidationResult} from "./validationResult";
import {HasLengthValidator} from "./validators/hasLengthValidator";
import {HasMaxLengthValidator} from "./validators/hasMaxLengthValidator";
import {HasMinLengthValidator} from "./validators/hasMinLengthValidator";
import {IsBigIntValidator} from "./validators/isBigIntValidator";
import {IsBooleanValidator} from "./validators/isBooleanValidator";
import {IsEqualToValidator} from "./validators/isEqualToValidator";
import {IsFunctionValidator} from "./validators/isFunctionValidator";
import {IsGreaterThanOrEqualToValidator} from "./validators/isGreaterThanOrEqualToValidator";
import {IsGreaterThanValidator} from "./validators/isGreaterThanValidator";
import {IsLessThanOrEqualToValidator} from "./validators/isLessThanOrEqualToValidator";
import {IsLessThanValidator} from "./validators/isLessThanValidator";
import {IsNotEqualToValidator} from "./validators/isNotEqualToValidator";
import {IsNumberValidator} from "./validators/isNumberValidator";
import {IsSymbolValidator} from "./validators/isSymbolValidator";
import {MustValidator} from "./validators/mustValidator";
import {MatchesValidator} from "./validators/matchesValidator";

export class ValidationRule<T, TProperty> {

    private m_fragments: Validator[] = [];
    private m_errorMessage: string = "";

    constructor(value: TProperty, name: string) {
        this.value = value;
        this.name = name;
    }

    public readonly name: string;
    public value: TProperty;
    public isThrowEnabled: boolean = false;

    public get error(): ValidationFailure | undefined {
        return this.m_errorMessage.length > 0 ? new ValidationFailure(this.name, this.m_errorMessage, this.value) : undefined;
    }

    public get isValid(): boolean {
        return this.error == null;
    }

    public throwOnError(): ValidationRule<T, TProperty> {
        this.isThrowEnabled = true;
        return this;
    }

    public static ruleFor<T, TProperty>(obj: T, accessor: Func1<T, TProperty>, name: keyof T | null): ValidationRule<T, TProperty> {
        return new ValidationRule(accessor(obj), typeof name === 'string' ? name : "");
    }

    public validate(): ValidationResult {
        Debug.writeLine("validatorRule.validate...");

        //This is where the magic happens
        for (let i: number = 0; i < this.m_fragments.length; i++) {
            const current: Validator = this.m_fragments[i];
            const next: Validator = this.m_fragments[i + 1];
            const prev: Validator = this.m_fragments[i - 1];

            //Stops execution if rule is not valid
            if (!this.isValid) {
                return new ValidationResult([this.error]);
            }

            if (current instanceof Condition) {
                //Skip conditions since by this point they have already been 
                continue;
            }
            if (next instanceof Condition) {
                Debug.writeLine("next is a valdiator condition");
                if (next.validate(this, current == null ? undefined : current)) {
                    current.validate(this, prev == null ? undefined : prev);
                }
            }
            else {
                current.validate(this, prev == null ? undefined : prev);
            }
        }
        return new ValidationResult([this.error]);
    }

    public setError(msg: string): boolean {
        this.m_errorMessage = msg;
        return false;
    }

    //#region Private methods

    private register(fragment: Validator): ValidationRule<T, TProperty> {
        this.m_fragments.push(fragment);
        return this;
    }

    //#endregion

    //#region  Components

    public hasLength(minValue: number, maxValue: number): ValidationRule<T, TProperty> {
        return this.register(new HasLengthValidator(minValue, maxValue));
    }

    public hasMaxLength(maxValue: number): ValidationRule<T, TProperty> {
        return this.register(new HasMaxLengthValidator(maxValue));
    }

    public hasMinLength(minValue: number): ValidationRule<T, TProperty> {
        return this.register(new HasMinLengthValidator(minValue));
    }

    public isBigInt(): ValidationRule<T, TProperty> {
        return this.register(new IsBigIntValidator());
    }

    public isBoolean(): ValidationRule<T, TProperty> {
        return this.register(new IsBooleanValidator());
    }

    public isEmail(): ValidationRule<T, TProperty> {
        return this.register(new IsEmailValidator());
    }
    public isEmpty(): ValidationRule<T, TProperty> {
        return this.register(new IsEmptyValidator());
    }

    public isEqualTo(value: any, comparer?: Func2<any, any, boolean>): ValidationRule<T, TProperty> {
        return this.register(new IsEqualToValidator(value, comparer));
    }

    public isFunction(): ValidationRule<T, TProperty> {
        return this.register(new IsFunctionValidator());
    }

    public isGreaterThanOrEqualTo(value: number): ValidationRule<T, TProperty> {
        return this.register(new IsGreaterThanOrEqualToValidator(value));
    }

    public isGreaterThan(value: number): ValidationRule<T, TProperty> {
        return this.register(new IsGreaterThanValidator(value));
    }

    public isLessThanOrEqualTo(value: number): ValidationRule<T, TProperty> {
        return this.register(new IsLessThanOrEqualToValidator(value));
    }

    public isLessThan(value: number): ValidationRule<T, TProperty> {
        return this.register(new IsLessThanValidator(value));
    }

    public isNotEmpty(): ValidationRule<T, TProperty> {
        return this.register(new IsNotEmptyValidator());
    }

    public isNotEqualTo(value: any, comparer?: Func2<any, any, boolean>): ValidationRule<T, TProperty> {
        return this.register(new IsNotEqualToValidator(value, comparer));
    }

    public isNotNull(): ValidationRule<T, TProperty> {
        return this.register(new IsNotNullValidator());
    }

    public isNull(): ValidationRule<T, TProperty> {
        return this.register(new IsNullValidator());
    }

    public isNumber(): ValidationRule<T, TProperty> {
        return this.register(new IsNumberValidator());
    }

    public isString(): ValidationRule<T, TProperty> {
        return this.register(new IsStringValidator());
    }

    public isSymbol(): ValidationRule<T, TProperty> {
        return this.register(new IsSymbolValidator());
    }

    public matches(exp: RegExp): ValidationRule<T, TProperty> {
        return this.register(new MatchesValidator(exp));
    }

    public must(predicate: Func1<any, boolean>): ValidationRule<T, TProperty> {
        return this.register(new MustValidator(predicate));
    }

    //#endregion

    //#region Conditions

    public withMessage(msg: string): ValidationRule<T, TProperty> {
        return this.register(new WithMessageCondition(msg));
    }

    public when(predicate: Func<boolean>): ValidationRule<T, TProperty> {
        return this.register(new WhenCondition(predicate));
    }

    //#endregion
}