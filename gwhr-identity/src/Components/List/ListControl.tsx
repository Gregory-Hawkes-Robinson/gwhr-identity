import "./ListControl.scss";
import { useRef, useState } from "react";
import { IVirtualListControlProps, VirtualListControl } from "../VirtualList/VirtualListControl";

export interface IListControlProps<T> extends IVirtualListControlProps<T> {
    //
}
/*
I think the way to properly resize is to get the delta, sure.  But how do we know whether it is expanding or contracting?
We need to record the previous coordinate of the pointer and compare to the current coordinate.  If current is greater than
previous, we are expanding, otherwise, we are shrinking.
 */
export function ListControl<T>(props: IListControlProps<T>): JSX.Element {
    const _borderSize: number = 40;
    const _rootElemRef = useRef<HTMLDivElement | null>(null);

    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [style, setStyle] = useState<any>(null);
    const [targetX, setTargetX] = useState<number>(0);

    const onMouseOverHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const pointerX: number = e.clientX;
        const containerWidth: number = _rootElemRef.current!.offsetWidth;
        const lowerBound: number = containerWidth - _borderSize;
        const upperBound: number = containerWidth;

        if (pointerX >= lowerBound && pointerX <= upperBound) {
            //setStyle({})
        } else {

        }
    }

    const onMouseUp = () => {
        setIsResizing(false);
    }

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const pointerX: number = e.clientX;
        const containerWidth: number = _rootElemRef.current!.offsetWidth;
        const lowerBound: number = containerWidth - _borderSize;
        const upperBound: number = containerWidth;
        console.log("pointerX: ", pointerX, "lowerbound: ", lowerBound, "upperbound: ", upperBound);
        if (pointerX >= lowerBound && pointerX <= upperBound) {
            console.log("Pointer in resize zone");
            setTargetX(pointerX);
            setIsResizing(true);
            // _rootElemRef.current!.style.cursor = "col-resize";
        }
    }

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (!isResizing) {
            return;
        }

        console.log("onMouseMove... e.clientX:", e.clientX, "target width:", _rootElemRef.current!.offsetWidth, "isresizing:", isResizing, "button:", e.button);
        const pointerX: number = e.clientX;
        const containerWidth: number = _rootElemRef.current!.offsetWidth;

        const delta: number = containerWidth - pointerX;
        if (targetX - pointerX > 1) {
            console.log("shrink");
        }
        else {
            console.log("expand");
        }
        const newWidth: string = `${containerWidth - delta}px`;

        console.log("pointerX: ", pointerX, "containerWidth:", containerWidth, "delta: ", delta);

        //setStyle({ width: pointerX });
        //_rootElemRef.current!.style.width = `${delta}px`;

    }

    return (
        <div className={`gh-list-control ${isResizing ? "is-resizing" : ""}`}
            ref={_rootElemRef} style={style} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseOut={onMouseUp}>
            <VirtualListControl items={props.items} itemTemplate={props.itemTemplate}></VirtualListControl>
        </div>
    );
}
/*
  var container = $('#container'),
        left = $('#left_panel'),
        right = $('#right_panel'),
        handle = $('#drag');

    handle.on('mousedown', function (e) {
        isResizing = true;
        lastDownX = e.clientX;
    });

    $(document).on('mousemove', function (e) {
        // we don't want to do anything if we aren't resizing.
        if (!isResizing) 
            return;

        var offsetRight = container.width() - (e.clientX - container.offset().left);

        left.css('right', offsetRight);
        right.css('width', offsetRight);
    }).on('mouseup', function (e) {
        // stop resizing
        isResizing = false;
    });
 */