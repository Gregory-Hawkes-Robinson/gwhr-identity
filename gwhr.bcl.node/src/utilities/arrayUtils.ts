import { Nullable } from "../system/nullable";
import { Func1 } from "../system/func";

class ArrayUtils {
    public removeNulls<T>(data: Nullable<T>[]): T[] {
        const cleaned: T[] = [];
        data.forEach((item: Nullable<T>): void => {
            if (item != null) {
                cleaned.push(item);
            }
        });
        return cleaned;
    }

    public any<T>(items: T[], condition: Func1<T, boolean>): boolean {
        for (let i: number = 0; i < items.length; i++) {
            const item: T = items[i];
            if (condition(item)) {
                return true;
            }
        }

        return false;
    }

    public all<T>(items: T[], condition: Func1<T, boolean>): boolean {
        let count: number = 0;

        for (let i: number = 0; i < items.length; i++) {
            const item: T = items[i];
            if (condition(item)) {
                count++;
            }
        }
        return count === items.length;
    }

    public addRange<T>(target: T[], values: T[]): void {
        target.push(...values);
    }

    public firstOrDefault<TSource, TDefault>(source: TSource[], defaultValue: TDefault, predicate: Func1<TSource, boolean>): TSource | TDefault {
        for (let i: number = 0; i < source.length; i++) {
            let item: TSource = source[i];
            if (predicate(item)) {
                return item;
            }
        }
        return defaultValue;
    }

    public sum<TSource>(source: TSource[], predicate: Func1<TSource, number>): number {
        let sm: number = 0;
        for (let i: number = 0; i < source.length; i++) {
            let item: TSource = source[i];
            sm = sm + predicate(item);
        }
        return sm;
    }

    public select<TSource>(source: TSource[], predicate: Func1<TSource, boolean>): TSource[] {
        return source.filter(x => predicate(x));
    }

    public async foreachAsync<TSource>(source: TSource[], action: Func1<TSource, Promise<void>>): Promise<void> {
        for (let i: number = 0; i < source.length; i++) {
            await action(source[i]);
        }
    }
}

const arrayUtils: ArrayUtils = new ArrayUtils();
export default arrayUtils;