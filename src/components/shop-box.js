export class ShopBox {
    constructor(container) {
        this.el = this.#createElement();
        container.append(this.el);
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("shop-box");

        const titleEl = document.createElement("p");
        titleEl.textContent = "Shop";
        titleEl.classList.add("shop-title");
        el.appendChild(titleEl);

        return el;
    }
}