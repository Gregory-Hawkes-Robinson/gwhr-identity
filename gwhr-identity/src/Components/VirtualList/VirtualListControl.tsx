import { useEffect, useMemo, useRef, useState } from "react";
import "./VirtualListControl.scss";

export interface IVirtualListItem<T> {
    key: string;
    content: T;
}

export interface IVirtualListControlProps<T> {
    items: T[];
    rowHeight: number;
    itemRenderer: (item: T) => JSX.Element;
}

export function VirtualListControl<T>(props: IVirtualListControlProps<T>): JSX.Element {

    const outerContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollSlugRef = useRef<HTMLUListElement | null>(null);
    const itemRef = useRef<HTMLLIElement | null>(null);
    const [index, setIndex] = useState<number>(0);
    const [items, setItems] = useState<IVirtualListItem<T>[]>([]);

    const top = useMemo(() => {
        return props.rowHeight * index;
    }, [index]);

    const rowHeight = useMemo(() => {
        return props.rowHeight;
    }, [index]);

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        setIndex(Math.floor(scrollTop / rowHeight));
        console.log("scrollTop:", scrollTop, "rowHeight:", rowHeight, "index:", index);
    }

    const createRows = (index: number): JSX.Element[] => {
        console.log("createRows... ,", "items:", items.length);

        const start: number = index - 1;
        const end: number = index + Math.ceil(1002 / props.rowHeight) + 1;

        const rows: JSX.Element[] = [];

        if (items.length == 0) {
            return rows;
        }

        for (let i: number = start; i <= end; i++) {
            if (i >= items.length) {
                return rows;
            }

            const top: number = (props.rowHeight * i);
            if (items[i] == null) {
                continue;
            }

            rows.push(<li className="item"
                key={items[i].key}
                style={{ top: top }}
                ref={i === start ? itemRef : null}>{props.itemRenderer(items[i].content)}</li>);
        }

        return rows;
    }

    useEffect(() => {
        const queuedItems: IVirtualListItem<T>[] = [];

        props.items.forEach((item: T) => {
            queuedItems.push({ key: Math.random().toString(), content: item });
        });

        setItems(queuedItems);

        //Init the slug height.  This creates the correctly sized scroll bar.
        const slugHeight: number = items.length * rowHeight;
        scrollSlugRef.current!.style.height = `${slugHeight}px`;
    }, [props.items]);

    return (
        <>
            <div className="virtual-list-control" ref={outerContainerRef}
                onScroll={onScroll}>
                <ul className="items-container" ref={scrollSlugRef}>
                    {createRows(index)}
                </ul>
            </div>
        </>
    );
}
