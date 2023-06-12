export class BooleanUtils {
    public isValid(value: string): boolean {
        return value.toLowerCase() === "true" || value.toLowerCase() === "false";
    }
}

const booleanUtils: BooleanUtils = new BooleanUtils();
export default booleanUtils;