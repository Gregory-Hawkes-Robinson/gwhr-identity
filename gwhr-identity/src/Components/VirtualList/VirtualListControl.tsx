import { useEffect, useMemo, useRef, useState } from "react";
import "./VirtualListControl.scss";

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

    const rowHeight = useMemo(() => {
        return props.rowHeight;
    }, [index]);

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        setIndex(Math.floor(scrollTop / rowHeight));
        console.log("scrollTop:", scrollTop, "rowHeight:", rowHeight, "index:", index);
    }

    const createRows = (index: number): JSX.Element[] => {
        console.log("createRows...");

        const start: number = index - 1;
        const end: number = index + Math.ceil(1002 / props.rowHeight);

        const rows: JSX.Element[] = [];

        for (let i: number = start; i <= end; i++) {
            if (i >= props.items.length) {
                return rows;
            }

            const top: number = (props.rowHeight * i);
            rows.push(<li className="item"
                key={Math.random()}
                style={{ top: top }}
                ref={i === start ? itemRef : null}>{props.itemRenderer(props.items[i])}</li>);
        }

        return rows;
    }

    useEffect(() => {
        //Init the slug height.  This creates the correctly sized scroll bar.
        const slugHeight: number = props.items.length * rowHeight;
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
