import "./VirtualListControl.scss";
export class VirtualListControl {

    private _rootElem: HTMLDivElement | undefined = undefined;
    private _scrollSlugElem: HTMLUListElement | undefined = undefined;

    private readonly _containerHeight: number = 1000;
    private readonly _rowHeight: number = 200;

    private readonly _items: number[] = [];
    private prevStartIdx: number = 0;

    constructor(items: number[]) {
        this._items = items;
        this.init();
    }

    private drawRows(index: number): void {
        if (index == this.prevStartIdx) {
            this.prevStartIdx = index;
            return;
        }

        if (index == this._items.length) {
            console.log("index == items count");
            return;
        }

        if (index > this._items.length) {
            console.log("index exceeds available items");
            return;
        }


        this.prevStartIdx = index;

        const start: number = index;
        const end: number = index + Math.ceil(1002 / this._rowHeight);

        //Remove existing children
        this._scrollSlugElem!.innerHTML = "";

        for (let i: number = start; i <= end; i++) {
            if (i >= this._items.length) {
                return;
            }
            const top: number = (this._rowHeight * i);// - this._rowHeight;
            console.log("index:", i, "item:", this._items[i], "top:", top);
            const elem: HTMLLIElement = document.createElement("li");
            elem.className = "item";
            elem.style.top = `${top}px`;
            elem.innerHTML = `${i}`;

            this._scrollSlugElem!.appendChild(elem);

        }

    }

    private onScroll = (e: Event) => {
        const scrollTop: number = (e.currentTarget as HTMLUListElement).scrollTop;
        const rowStartIdx: number = Math.floor(scrollTop / this._rowHeight);;

        console.log("onScroll: scrollTop:", (e.currentTarget as HTMLUListElement).scrollTop, "startIndex:", rowStartIdx, "items length:", this._items.length);
        this.drawRows(rowStartIdx);
    }

    //Init the basic html elements
    private init(): void {

        //Init the control root
        this._rootElem = document.createElement("div");
        this._rootElem.className = "virtual-list-control";
        this._rootElem.onscroll = this.onScroll;

        //Init the scroll slug
        this._scrollSlugElem = document.createElement("ul");
        this._scrollSlugElem.className = "items-container";
        this._scrollSlugElem.style.height = `${this._items.length * this._rowHeight}px`;
        this._rootElem.appendChild(this._scrollSlugElem);

        const app: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;
        app.appendChild(this._rootElem);

    }
}