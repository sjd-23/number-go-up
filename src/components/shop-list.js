export class ShopList {
    constructor(shopBox) {
        this.shopBox = shopBox;
        this.items = [];
        this.el = this.#createElement();
        this.shopBox.el.append(this.el);
    }

    addItem(item) {
        this.items.push(item);
        this.el.append(item.el);
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("shop-list");
        return el;
    }

    render() {
        for (const item of this.items) { item.render(); }
    }
}