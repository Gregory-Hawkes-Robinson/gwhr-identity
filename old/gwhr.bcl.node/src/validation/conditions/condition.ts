import {Func} from "../../system/func";
import {Validator} from "../validators/validator";

export abstract class Condition extends Validator {

    protected predicate: Func<boolean>;

    protected constructor(predicate: Func<boolean>) {
        super();
        this.predicate = predicate;
    }

    public errorMessage: string = "";
}



