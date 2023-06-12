import arrayUtils from "../utilities/arrayUtils";
import {ValidationFailure} from "./validationFailure";

export class ValidationResult {

    constructor(errors: (ValidationFailure | undefined)[]) {
        this.errors = arrayUtils.removeNulls(errors);
    }

    public readonly errors: ValidationFailure[];
    public get isSuccess(): boolean {
        return this.errors.length === 0;
    }

    public get errorMessage(): string {
        return this.errors.map(x => x.errorMessage).join(",");
    }
}