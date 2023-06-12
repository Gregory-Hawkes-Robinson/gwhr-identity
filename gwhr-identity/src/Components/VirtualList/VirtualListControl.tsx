import { useEffect, useRef, useState } from "react";
import "./VirtualListControl.scss";

export interface IVirtualListControlProps {
    items: number[];
    rowHeight: number;
}

export function VirtualListControl(props: IVirtualListControlProps): JSX.Element {

    const outerContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollSlugRef = useRef<HTMLUListElement | null>(null);
    const [index, setIndex] = useState<number>(0);

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

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        const rowHeight: number = getRowHeight();
        let index = Math.floor(scrollTop / rowHeight);
        setIndex(index);
        console.log("scrollTop:", scrollTop, "rowHeight:", rowHeight, "index:", index);
    }

    const createRows = (): JSX.Element[] => {
        console.log("createRows...");
        const rowHeight: number = getRowHeight();
        const start: number = index;
        const end: number = index + Math.ceil(1002 / rowHeight);//index + 11;//getViewportCapacity(rowHeight);
        const offSetBase = (rowHeight * 2) + 2;//(rowHeight * index);// - (rowHeight * 2) + 2;
        //setItemVertOffset({ top: rowHeight * index });

        const rows: JSX.Element[] = [];

        console.log("rowHeight:", rowHeight, "start:", start, "end:", end, "offsetBase:", offSetBase);
        if (props.items.length === 0) {
            return [];
        }
        for (let i: number = start; i <= end; i++) {
            const top: number = (rowHeight * i) - 200;
            console.log("index:", i, "item:", props.items[i], "top:", top);
            rows.push(<li className="item" key={props.items[i]} style={{ top: top }} >{props.items[i]}</li>);
        }
        return rows;
    }



    useEffect(() => {
        initScrollSlugHeight();
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
