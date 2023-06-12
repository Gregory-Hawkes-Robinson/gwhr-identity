import { useEffect, useRef, useState } from "react";
import "./VirtualListControl.scss";

export interface IVirtualListControlProps {
    items: number[];
    rowHeight: number;
}

export function VirtualListControl(props: IVirtualListControlProps): JSX.Element {

    const outerContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollSlugRef = useRef<HTMLUListElement | null>(null);

    const itemRef = useRef<HTMLLIElement | null>(null); //👈 Modified type and initialized with "null"

    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [itemHt, setItemHt] = useState<number>(0);
    const [viewportCapacity, setViewportCapacity] = useState<number>(0);
    const [itemVertOffset, setItemVertOffset] = useState<any>({ top: 0 });
    const [prevHiddenTilesCount, setPrevHiddenTilesCount] = useState<number>(0);
    const [index, setIndex] = useState<number>(0);

    const initItemsContainerHeight = (): void => {
        // const height: number = itemHt * items.length;//innerContainerRef.current == null ? 1 : innerContainerRef.current.clientHeight;
        // scrollSlugRef.current!.style.height = `${height}px`;
        // console.log("inner container height:", height);
    }

    const getRowHeight = (): number => {
        const height: number = props.rowHeight;//= itemRef.current == null ? 1 : itemRef.current.offsetHeight;
        // setItemHt(itemRef.current == null ? 1 : height + 10);
        // console.log("item height:", height);
        return height;
    }

    const initScrollSlugHeight = () => {
        const slugHeight: number = props.items.length * getRowHeight();
        scrollSlugRef.current!.style.height = `${slugHeight}px`;
    }

    const getViewportCapacity = (rowHeight: number): number => {
        console.log("rowHeight:", rowHeight, "outerRef:", outerContainerRef.current!.clientHeight);
        const count: number = Math.ceil(outerContainerRef.current!.clientHeight / rowHeight);
        // setViewportCapacity(count);
        console.log("viewport capacity:", count, "tiles");
        return count;
    }

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        const rowHeight: number = 200;
        let index = Math.floor(scrollTop / rowHeight);
        setIndex(index);
        console.log("scrollTop:", e.currentTarget.scrollTop, "index:", index);
    }

    const createRows = (): JSX.Element[] => {
        console.log("createRows...");
        const rowHeight: number = getRowHeight();
        const start: number = index;
        const end: number = index + 7;//getViewportCapacity(rowHeight);
        const offSetBase = (rowHeight * index);// - (rowHeight * 2) + 2;
        //setItemVertOffset({ top: rowHeight * index });

        const rows: JSX.Element[] = [
            <li className="item" key={new Date().getTime()} style={{ top: (rowHeight * start) - 205 }} >{`${props.items[0]}x`}</li>

        ];

        console.log("rowHeight:", rowHeight, "start:", start, "end:", end, "offsetBase:", offSetBase);
        if (props.items.length === 0) {
            return [];
        }
        for (let i: number = start; i < end; i++) {
            const top: number = rowHeight * i;
            console.log("item:", props.items[i], "top:", top);
            rows.push(<li className="item" key={props.items[i]} style={{ top: top }} >{props.items[i]}</li>);
        }
        return rows;
    }



    useEffect(() => {
        //const height: number = initItemHeight();
        // initItemsContainerHeight();
        // initViewportCapacity(height);
        // const result = props.items.slice(0, 4);
        // console.log("setting visible items to:", result);
        // setVisibleItems(props.items.slice(0, 4));
        initScrollSlugHeight();
    }, [props.items]);

    // useEffect(() => {

    // }, [props.rowHeight]);


    return (
        <>
            <div className="virtual-list-control" ref={outerContainerRef}
                onScroll={onScroll}>
                <ul className="items-container" ref={scrollSlugRef}>
                    {createRows()}
                </ul>
            </div>
        </>
    );
}
