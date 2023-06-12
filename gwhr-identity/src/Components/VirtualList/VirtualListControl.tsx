import { useEffect, useRef, useState } from "react";
import "./VirtualListControl.scss";

export interface IVirtualListControlProps {
    items: number[];
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

    const initItemHeight = (): number => {
        const height: number = 200;//= itemRef.current == null ? 1 : itemRef.current.offsetHeight;
        setItemHt(itemRef.current == null ? 1 : height + 10);
        console.log("item height:", height);
        return height;
    }

    const initViewportCapacity = (height: number): number => {
        console.log("height:", height, "outerRef:", outerContainerRef.current!.clientHeight);
        const count: number = Math.ceil(outerContainerRef.current!.clientHeight / height);
        setViewportCapacity(count);
        console.log("viewport capacity:", count, "tiles");
        return count;
    }

    const getHiddenTilesCount = (e: React.UIEvent<HTMLDivElement, UIEvent>): number => {
        const scrollTop: number = e.currentTarget.scrollTop;

        console.log("scrolling:", scrollTop);

        //For the moment, let's assume the tile height is 200px for now
        const hiddenTiles: number = Math.floor(scrollTop / itemHt);// 205;
        console.log("hiddenTiles:", hiddenTiles, Math.floor(hiddenTiles));
        return hiddenTiles;
    }

    const initVisibleTiles = (newHiddenTilesCount: number) => {
        console.log("initVisibleTiles. prevHiddenTilesCount: ", prevHiddenTilesCount, "newHiddenTilesCount:", newHiddenTilesCount);
        if (prevHiddenTilesCount == newHiddenTilesCount) {
            return;
        }
        const startIdx: number = newHiddenTilesCount;
        const endIdx: number = startIdx + viewportCapacity;
        // const visItems: number[] = items.slice(startIdx, endIdx);

        //setVisibleItems(visItems);

        setPrevHiddenTilesCount(newHiddenTilesCount);

        //console.log("setVisibleItems startIdx =", startIdx, "endIdx = ", endIdx, "visItems:", visItems);
    }

    //This causes the list to infinitely redraw.  Not good.
    const initTopPosition = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        const top: number = scrollTop;// + itemHt * visibleItems.length;
        setItemVertOffset({ top: top });
        console.log("initTopPosition: scrollTop", scrollTop, "top:", top);
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
        const rowHeight: number = 200;
        const start: number = index;
        const end: number = index + 3;
        const offSetBase = rowHeight * index;
        //setItemVertOffset({ top: rowHeight * index });

        const rows: JSX.Element[] = [];

        console.log("rowHeight:", rowHeight, "start:", start, "end:", end, "offsetBase:", offSetBase);
        if (props.items.length === 0) {
            return [];
        }
        for (let i: number = start; i < end; i++) {
            const top: number = offSetBase + i;
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
    }, [props.items]);

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
