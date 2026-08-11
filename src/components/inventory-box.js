export class InventoryBox {
    constructor(container, game) {
        this.el = this.#createElement();
        this.game = game;
        container.append(this.el);
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("inventory-box");

        const titleEl = document.createElement("p");
        titleEl.textContent = "Inventory";
        titleEl.classList.add("inventory-title");
        el.appendChild(titleEl);

        return el;
    }

    render() {
        this.el.classList.toggle("hidden", !this.game.hasAnyItems());
    }
}