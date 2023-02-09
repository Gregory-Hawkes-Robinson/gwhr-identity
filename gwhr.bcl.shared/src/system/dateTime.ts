import dayjs, { Dayjs } from "dayjs";
import UTC from "dayjs/plugin/utc";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';

//require('dayjs/locale/es')


dayjs.extend(dayOfYear)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter);
dayjs.extend(UTC);
dayjs.extend(customParseFormat);

export enum DateTimeKind {
    Local = 2,
    Utc = 1
}

export interface IDateTimeInit {
    date: Date | string | number | undefined,
    kind: DateTimeKind,
    format?: string;
}

export class DateTime {

    private _dayjs: Dayjs = dayjs.utc();
    private _kind: DateTimeKind = DateTimeKind.Local;

    public constructor(data: IDateTimeInit) {
        this._kind = data.kind;
        this._dayjs = this.kind == DateTimeKind.Local
            ? dayjs(data.date, data.format)
            : dayjs.utc(data.date, data.format);
    }

    // public constructor(date: Date | string | number | undefined, kind: DateTimeKind) {
    //     this._kind = kind;
    //     this._dayjs = kind == DateTimeKind.Local
    //         ? dayjs(date)
    //         : dayjs.utc(date);

    // }

    //#region Properties 

    public get day(): number {
        return this._dayjs.date();
    }

    public get dayOfWeek(): number {
        return this._dayjs.day();
    }

    public get dayOfYear(): number {
        return this._dayjs.dayOfYear();
    }

    public get hour(): number {
        return this._dayjs.hour();
    }

    public get kind(): DateTimeKind {
        return this._kind;
    }

    public get millisecond(): number {
        return this._dayjs.millisecond();
    }

    public get minute(): number {
        return this._dayjs.minute();
    }

    //Months are 0 indexed
    public get month(): number {
        return this._dayjs.month();
    }

    public static get now(): DateTime {
        return new DateTime({ date: undefined, kind: DateTimeKind.Local });
    }

    public get second(): number {
        return this._dayjs.second();
    }

    public get ticks(): number {
        return this._dayjs.unix();
    }

    public static get today(): DateTime {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return new DateTime({ date: d, kind: DateTimeKind.Local });
    }

    public static get utcNow(): DateTime {
        return new DateTime({ date: undefined, kind: DateTimeKind.Utc });
    }

    public get year(): number {
        return this._dayjs.year();
    }

    public get date(): Date {
        return this._dayjs.toDate();
    }

    //#endregion

    //#region Methods

    public addDays(value: number): DateTime {
        this._dayjs = this._dayjs.add(value, "day");
        return this;
    }

    public addHours(value: number): DateTime {
        this._dayjs = this._dayjs.add(value, "hour");
        return this;
    }

    public addMilliseconds(value: number): DateTime {
        this._dayjs = this._dayjs.add(value, "ms");
        return this;
    }

    public addMinutes(value: number): DateTime {
        this._dayjs = this._dayjs.add(value, "m");
        return this;
    }

    public addMonths(value: number): DateTime {
        this._dayjs = this._dayjs.add(value, "m");
        return this;
    }

    public addSeconds(value: number): DateTime {
        this._dayjs = this._dayjs.add(value, "s");
        return this;
    }

    public addYear(value: number): DateTime {
        this._dayjs = this._dayjs.add(value);
        return this;
    }

    public subtractDays(value: number): DateTime {
        this._dayjs = this._dayjs.subtract(value, "day");
        return this;
    }

    public subtractHours(value: number): DateTime {
        this._dayjs = this._dayjs.subtract(value, "hour");
        return this;
    }

    public subtractMilliseconds(value: number): DateTime {
        this._dayjs = this._dayjs.subtract(value, "ms");
        return this;
    }

    public subtractMinutes(value: number): DateTime {
        this._dayjs = this._dayjs.subtract(value, "m");
        return this;
    }

    public subtractMonths(value: number): DateTime {
        this._dayjs = this._dayjs.subtract(value, "m");
        return this;
    }

    public subtractSeconds(value: number): DateTime {
        this._dayjs = this._dayjs.subtract(value, "s");
        return this;
    }

    public subtractYear(value: number): DateTime {
        this._dayjs = this._dayjs.subtract(value);
        return this;
    }

    public compareTo(value: DateTime): number {
        if (this._dayjs.isBefore(value.date)) {
            return -1;
        }
        if (this._dayjs.isSame(value.date)) {
            return 0;
        }
        return 1;
    }

    public isBefore(value: DateTime): boolean {
        return this._dayjs.isBefore(value.date);
    }

    public isSame(value: DateTime): boolean {
        return this._dayjs.isSame(value.date);
    }

    public isAfter(value: DateTime): boolean {
        return this._dayjs.isAfter(value.date);
    }

    public isSameOrBefore(value: DateTime): boolean {
        return this._dayjs.isSameOrBefore(value.date);
    }


    public toString(value?: string): string {
        return this._dayjs.format(value);
    }

    public toJson(): string {
        return this._dayjs.toJSON();
    }

    public toISOString(): string {
        return this._dayjs.toISOString();

    }

    //#endregion
}