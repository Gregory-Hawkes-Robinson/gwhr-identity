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

    const targetX = useRef<number>(-1);

    const [isHovering, setIsHovering] = useState<boolean>(false);

    const onMouseOverHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("onMouseOverHandler...");
        const pointerX: number = e.clientX;
        const containerWidth: number = _rootElemRef.current!.offsetWidth;
        const lowerBound: number = containerWidth - _borderSize;
        const upperBound: number = containerWidth;

        console.log("lowerBound:", lowerBound, "pointerX", pointerX, "upperBound", upperBound);

        if (pointerX >= lowerBound && pointerX <= upperBound) {
            console.log("Over target area");
            setIsHovering(true);
        } else {
            console.log("outside target area");
            setIsHovering(false);
        }
    }


    const getMoveDirection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): number => {
        const pointerX: number = e.clientX;
        if (targetX.current == pointerX) {
            return 0;
        }
        const dir: number = pointerX - targetX.current!;
        let value = 0;

        if (dir > 0) {
            //console.log("moving right", dir);
            value = 1
        }
        else {
            //console.log("moving left", dir);
            value = -1;
        }

        targetX.current = pointerX;
        return value;
    }

    const isInTargetZone = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): boolean => {
        const pointerX: number = e.clientX;
        const containerWidth: number = _rootElemRef.current!.offsetWidth;
        const lowerBound: number = containerWidth - _borderSize;

        if (pointerX < lowerBound) {
            console.log("outside target area");
            if (isHovering) {
                setIsHovering(false);
                return false;
            }
        }
        console.log("inside target area");
        setIsHovering(true);
        return true
    }

    const onMouseDownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const pointerX: number = e.clientX;
        if (isInTargetZone(e)) {
            console.log("in target zone");
            setIsResizing(true);
        }
        console.log("NOT in target zone");
    }

    const onMouseLeaveHandler = () => {
        console.log("mouse left");
        setIsResizing(false);
    }

    const onMouseUpHandler = () => {
        setIsResizing(false);
    }


    const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        //console.log("onMouseMove...");
        isInTargetZone(e);
        const target = e.target as HTMLElement;
        console.log(target);
        console.log(target.attributes);

        const pointerX: number = e.clientX;
        if (isResizing) {
            setStyle({ width: `${pointerX}px` });
        }
    }

    return (
        <div className={`gh-list-control ${isHovering ? "is-hovering" : ""}`}
            ref={_rootElemRef} style={style}
            onMouseMove={onMouseMove}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onMouseLeave={onMouseLeaveHandler}>
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