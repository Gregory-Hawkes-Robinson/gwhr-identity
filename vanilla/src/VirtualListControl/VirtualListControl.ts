import "./VirtualListControl.scss";
export class VirtualListControl {

    private _rootElem: HTMLDivElement | undefined = undefined;
    private _scrollSlugElem: HTMLUListElement | undefined = undefined;

    // private readonly _containerHeight: number = 1000;
    private _rowHeight: number = 0;
    private _isInit: boolean = false;

    private readonly _items: number[] = [];

    constructor(items: number[]) {
        this._items = items;
        this.init();
    }

    private drawRows(index: number): void {

        const start: number = index - 1;
        const end: number = index + Math.ceil(1002 / this._rowHeight);

        //Remove existing children
        // while (this._scrollSlugElem!.childNodes.length > 1) {
        //     this._scrollSlugElem!.removeChild(this._scrollSlugElem!.lastChild!);
        // }
        this._scrollSlugElem!.innerHTML = "";

        for (let i: number = start; i <= end; i++) {
            if (i >= this._items.length) {
                return;
            }
            const top: number = (this._rowHeight * i);// - this._rowHeight;
            console.log("index:", i, "item:", this._items[i], "top:", top);
            const elem: HTMLLIElement = document.createElement("li");
            elem.className = "item";
            elem.style.top = `${top + 1}px`;
            elem.innerHTML = `${i}`;

            this._scrollSlugElem!.appendChild(elem);
        }
    }

    private drawRow = (index: number): HTMLLIElement => {
        const top: number = (this._rowHeight * index);// - this._rowHeight;

        const elem: HTMLLIElement = document.createElement("li");
        elem.className = "item";
        elem.style.top = `${top + 1}px`;
        elem.innerHTML = `${index}`;

        this._scrollSlugElem!.appendChild(elem);
        return elem;
    }



    private initRowHeight = () => {

        console.log("slug has ref");

        const observer = new MutationObserver((mutationList: MutationRecord[], observer) => {
            console.log("oberver callback...");
            console.log("isInit:", this._isInit);


            for (const mutation of mutationList) {
                if (this._isInit) {
                    console.log("Items height inited...");
                    return;
                }
                if (mutation.type === "childList") {
                    console.log("mutation:", mutation);
                    if (mutation.addedNodes.length > 0) {
                        const height: number = (mutation.addedNodes.item(0) as HTMLLIElement).offsetHeight!
                        console.log("addedNode:", height);
                        this._rowHeight = height;
                        const slugHeight: number = this._items.length * height;
                        this._scrollSlugElem!.style.height = `${slugHeight}px`;
                        this.drawRows(0);
                        observer.disconnect();
                        this._isInit = true;
                    }

                }
            }
        });
        observer.observe(this._scrollSlugElem!, { childList: true });

        this._scrollSlugElem!.appendChild(this.drawRow(0));
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

        //Init the header
        // const header: HTMLDivElement = document.createElement("div");
        // header.className = "header";
        // this._rootElem.appendChild(header);

        //Init the scroll slug
        this._scrollSlugElem = document.createElement("ul");
        this._scrollSlugElem.className = "items-container";
        this._scrollSlugElem.style.height = `${this._items.length * this._rowHeight}px`;
        this._rootElem.appendChild(this._scrollSlugElem);

        const app: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;
        app.appendChild(this._rootElem);

        this.initRowHeight();

        //const rowStartIdx: number = Math.floor(0 / this._rowHeight);;
        //this.drawRows(rowStartIdx);

    }
}