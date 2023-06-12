export class ValidationFailure {
    constructor(propertyName: string, errorMessage: string, attemptedValue: any) {
        this.propertyName = propertyName;
        this.errorMessage = errorMessage;
        this.attemptedValue = attemptedValue;
    }

    public propertyName: string;
    public errorMessage: string;
    public attemptedValue: any;
}