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
        return props.rowHeight;
    }

    const initScrollSlugHeight = () => {
        const slugHeight: number = props.items.length * getRowHeight();
        scrollSlugRef.current!.style.height = `${slugHeight}px`;
    }

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop: number = e.currentTarget.scrollTop;
        const rowHeight: number = getRowHeight();
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

            const top: number = (props.rowHeight * i);// - this._rowHeight;

            rows.push(<li className="item" key={Math.random()} style={{ top: top }}>{props.items[i]}</li>);

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
                    {createRows(index)}
                </ul>
            </div>
        </>
    );
}
