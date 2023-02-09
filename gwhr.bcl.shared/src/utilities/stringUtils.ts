class StringUtils {
    public empty: string = "";

    public isNullUndefinedOrEmpty(value?: string): boolean {
        return typeof value === "undefined" || value === null || value === "";
    }

    public lowerCaseFirstLetter(value: string): string {
        return `${value.charAt(0).toLowerCase()}${value.slice(1)}`;
    }

    public format(target: string, ...args: string[]): string {
        for (let i: number = 0; i < args.length; i++) {
            target = target.replace(`'{${i}}'`, args[i]);
        }
        return target;
    }
}

const stringUtils: StringUtils = new StringUtils();
export default stringUtils;