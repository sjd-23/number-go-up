export class InventoryBox {
    constructor(game) {
        this.el = this.#createElement();
        this.game = game;
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("box");

        const titleEl = document.createElement("p");
        titleEl.textContent = "Inventory";
        titleEl.classList.add("box-title");
        el.appendChild(titleEl);

        return el;
    }

    render() {
        this.el.classList.toggle("hidden", !this.game.hasAnyItems());
    }
}