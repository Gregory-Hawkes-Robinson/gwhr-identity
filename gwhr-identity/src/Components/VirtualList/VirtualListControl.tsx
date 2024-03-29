import { useEffect, useMemo, useRef, useState } from "react";
import "./VirtualListControl.scss";

export interface IVirtualListItem<T> {
    key: string;
    content: T;
    cachedElement: JSX.Element | undefined;
}

export interface IVirtualListControlProps<T> {
    items: T[];
    itemTemplate: (item: T) => JSX.Element;
}

export function VirtualListControl<T>(props: IVirtualListControlProps<T>): JSX.Element {

    const outerContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollSlugRef = useRef<HTMLUListElement | null>(null);
    const itemRef = useRef<HTMLLIElement | null>(null);
    const [index, setIndex] = useState<number>(0);
    const [items, setItems] = useState<IVirtualListItem<T>[]>([]);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [rowHeight, setRowHeight] = useState(0);

    // const top = useMemo(() => {
    //     return props.rowHeight * index;
    // }, [index]);

    // const rowHeight = useMemo(() => {
    //     return props.rowHeight;
    // }, [index]);

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        setIndex(Math.floor(scrollTop / rowHeight));
        console.log("scrollTop:", scrollTop, "rowHeight:", rowHeight, "index:", index);
    }

    const createRows = (index: number): JSX.Element[] => {
        //console.log("createRows... ,", "items:", items.length);

        const start: number = index - 1;
        const end: number = index + Math.ceil(1002 / rowHeight) + 1;

        const rows: JSX.Element[] = [];

        if (items.length == 0) {
            return rows;
        }

        for (let i: number = start; i <= end; i++) {
            if (i >= items.length) {
                return rows;
            }

            const top: number = (rowHeight * i);
            if (items[i] == null) {
                continue;
            }

            items[i].cachedElement = props.itemTemplate(items[i].content);

            rows.push(<li className="item"
                key={items[i].key}
                style={{ top: top }}
                ref={i === start ? itemRef : null}>{items[i].cachedElement}</li>);
        }

        return rows;
    }

    useEffect(() => {
        const queuedItems: IVirtualListItem<T>[] = [];

        props.items.forEach((item: T) => {
            queuedItems.push({ key: Math.random().toString(), content: item, cachedElement: undefined });
        });

        setItems(queuedItems);

        //Auto calculate the row height
        if (scrollSlugRef.current != null) {
            // console.log("slug has ref");
            const observer = new MutationObserver((mutationList: MutationRecord[], observer) => {
                for (const mutation of mutationList) {
                    if (isInitialized) {
                        return;
                    }
                    if (mutation.type === "childList") {
                        // console.log("mutation:", mutation);
                        if (mutation.addedNodes.length > 0) {
                            const height: number = (mutation.addedNodes.item(0) as HTMLLIElement).offsetHeight!
                            console.log("addedNode:", height);
                            setRowHeight(height);
                            setIsInitialized(true);
                            const slugHeight: number = props.items.length * height;
                            scrollSlugRef.current!.style.height = `${slugHeight}px`;
                            observer.disconnect();
                        }
                    }
                }
            });

            observer.observe(scrollSlugRef.current, { childList: true });
        }
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
