export class Column {
    constructor(container,side, ...children) {
        this.el = this.#createElement(side);
        container.append(this.el);
        for (const child of children) {
            this.el.append(child.el);
        }
    }

    #createElement(side) {
        const el = document.createElement("div");
        el.classList.add("column", `column-${side}`);
        return el;
    }
}