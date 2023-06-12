import { useEffect, useRef, useState } from "react";
import "./VirtualListControl.scss";

export function VirtualListControl(): JSX.Element {

    const outerContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollSlugRef = useRef<HTMLDivElement | null>(null);

    const itemRef = useRef<HTMLLIElement | null>(null); //👈 Modified type and initialized with "null"

    const [items, setItems] = useState<number[]>([]);
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [itemHt, setItemHt] = useState<number>(0);
    const [viewportCapacity, setViewportCapacity] = useState<number>(0);
    const [itemVertOffset, setItemVertOffset] = useState<any>({ top: 0 });
    const [prevHiddenTilesCount, setPrevHiddenTilesCount] = useState<number>(0);


    const populateItems = () => {
        const tmp: number[] = [];
        for (let i: number = 0; i < 300; i++) {
            tmp.push(i);
        }
        setItems(tmp);
    };

    const initItemsContainerHeight = (): void => {
        const height: number = itemHt * items.length;//innerContainerRef.current == null ? 1 : innerContainerRef.current.clientHeight;
        scrollSlugRef.current!.style.height = `${height}px`;
        console.log("inner container height:", height);
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
        const visItems: number[] = items.slice(startIdx, endIdx);
        
        //setVisibleItems(visItems);
        
        setPrevHiddenTilesCount(newHiddenTilesCount);

        console.log("setVisibleItems startIdx =", startIdx, "endIdx = ", endIdx, "visItems:", visItems);
    }

    //This causes the list to infinitely redraw.  Not good.
    const initTopPosition = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        const top: number = scrollTop;// + itemHt * visibleItems.length;
        setItemVertOffset({ top: top });
        console.log("initTopPosition: scrollTop", scrollTop, "top:", top);
    }

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        console.log("ONSCROL!!!!");
        const hiddenTilesCount: number = getHiddenTilesCount(e);
        initVisibleTiles(hiddenTilesCount);
        initTopPosition(e);
    }

    //Mount
    useEffect(() => {
        populateItems();
    }, []);

    useEffect(() => {
        const height: number = initItemHeight();
        initItemsContainerHeight();
        initViewportCapacity(height);
        setVisibleItems(items.slice(0, 6));

    }, [items]);

    return (
        <>
            <div className="virtual-list-control" ref={outerContainerRef}
                onScroll={onScroll}>
                <div className="scroll-slug" ref={scrollSlugRef}>
                    <ul className="items-container" style={itemVertOffset}>
                        {visibleItems.map((item, idx) => {
                            if (idx == 0) {
                                return <li className="item" ref={itemRef} key={new Date().getTime()}>{item} </li>
                            }
                            return <li className="item" key={item}>{item}</li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    ); 
}
