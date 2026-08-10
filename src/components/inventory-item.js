export class InventoryItem {
    constructor(item, game) {
        this.item = item;
        this.game = game;
        this.countEl = document.createElement("span");
        this.el = this.#createElement();
    }

    #createElement() {
        const el = document.createElement("span");
        el.classList.add("inventory-item");

        const nameEl = document.createElement("span");
        nameEl.classList.add("inventory-item-name");
        nameEl.textContent = this.item.name;

        this.countEl.classList.add("inventory-item-count");

        el.append(nameEl, this.countEl);
        return el;
    }

    render() {
        this.countEl.textContent = `x${this.game.owned[this.item.id]}`;
    }
}