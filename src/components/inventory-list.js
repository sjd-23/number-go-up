import { InventoryItem } from "./inventory-item.js";
import { ITEMS } from "../items.js";

export class InventoryList {
    constructor(inventoryBox, game) {
        this.inventoryBox = inventoryBox;
        this.game = game;
        this.items = {};
        this.el = this.#createElement();
        this.inventoryBox.el.append(this.el);
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("inventory-list");
        return el;
    }

    render() {
        for (const id in this.game.owned) {
            if (this.game.owned[id] === 0) continue;

            if (!this.items[id]) {
                const inventoryItem = new InventoryItem(ITEMS[id], this.game);
                this.items[id] = inventoryItem;
                this.el.append(inventoryItem.el);
            }

            this.items[id].render();
        }
    }
}