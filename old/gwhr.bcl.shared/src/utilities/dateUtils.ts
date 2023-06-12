
export interface DateInit {
    dateTime?: Date;
    year?: number;
    month?: number;
    date?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
}

export enum DateFormats {
    yyyyMMdd = "yyyyMMdd",
    yyyy_MM_ddd = "YYYY-MM-DD"
}

export class DateUtils {
    public toMMDDYYYY(date: Date): string {
        const str: string = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
        return str;
    }


    public toUTCDate(data: DateInit): Date {
        let newDate: Date = new Date();
        if (data.dateTime != null) {
            newDate = new Date(data.dateTime!);
        }

        if (data.year != null) {
            newDate.setUTCFullYear(data.year!);
        }

        if (data.month != null) {
            newDate.setUTCMonth(data.month!);
        }

        if (data.date != null) {
            newDate.setUTCDate(data.date!);
        }

        if (data.hours != null) {
            newDate.setUTCHours(data.hours!);
        }

        if (data.minutes != null) {
            newDate.setUTCMinutes(data.minutes!);
        }

        if (data.seconds != null) {
            newDate.setUTCSeconds(data.seconds!);
        }

        if (data.milliseconds != null) {
            newDate.setUTCMilliseconds(data.milliseconds!);
        }

        return this.toUTCDateTime(newDate);
    }

    private toUTCDateTime(data: Date): Date {
        const date: Date = new Date(Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate(), data.getUTCHours(), data.getUTCMinutes(), data.getUTCSeconds()));
        //Debug.writeLine("dateY:", date);
        //Debug.writeLine("dateX:", date.toLocaleString('en-us', {timeZone: 'UTC'}));
        return date;
    }

    public getUTCNow(): Date {
        var now = new Date();
        const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        return utc;
    }

    private getNumberWith2Digits(n: number): string {
        if (n < 10) return `0${n}`
        return n.toString();
    }

    public toStringFormat(date: Date, format: DateFormats): string {
        // 2 digit format
        const month: string = this.getNumberWith2Digits(date.getMonth() + 1);
        const day: string = this.getNumberWith2Digits(date.getDate());
        switch (format) {
            case DateFormats.yyyyMMdd:
                return `${date.getFullYear()}${month}${day}`;
            case DateFormats.yyyy_MM_ddd:
                return `${date.getFullYear()}-${month}-${day}`;
            default:
                return date.toString();
        }
    }
}

const dateUtils: DateUtils = new DateUtils();
export default dateUtils;