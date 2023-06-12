export class NumberUtils {
    public isNumeric(str: string): boolean {
        // if (typeof str !== "string") {
        //     return false;
        // } // we only process strings!
        return !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }
}

const numberUtils: NumberUtils = new NumberUtils();
export default numberUtils;