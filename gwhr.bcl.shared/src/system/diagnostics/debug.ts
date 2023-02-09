export default class debug {
    public static writeLine = console.log.bind(console);
    public static writeError = console.error.bind(console, "[Error]  %s");
    public static writeWarning = console.warn.bind(console, "[Warning]  %s");
    public static writeInfo = console.info.bind(console, "[Information]  %s");
    public static writeSuccess = console.log.bind(console, "[Success]  %s");
}