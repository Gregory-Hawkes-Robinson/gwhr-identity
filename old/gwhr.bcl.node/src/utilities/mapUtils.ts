import { Nullable } from "../system/nullable";

class MapUtils {
    public tryGetValue<TKey, TValue>(source: Map<TKey, TValue>, key: TKey, value: (new () => TValue)): [result: boolean, out: TValue] {
        let result: TValue | undefined = source.get(key);
        if (result == null) {
            return [false, new value()];
        }
        return [true, result!];
    }

    public toArray<TKey, TValue>(source: Map<TKey, TValue>) {
        return Array.from(source.values());
    }

    public firstOrDefault<TKey, TValue>(source: Map<TKey, TValue>): Nullable<TValue> {
        const result: TValue[] = [];

        source.forEach((value: TValue) => {
            if (result.length > 0) {
                return;
            }
            result.push(value);
        });

        return result.length === 0 ? undefined : result[0];
    }
}

const mapUtils: MapUtils = new MapUtils();
export default mapUtils;