import {RESOURCES} from "../resources.js";

export class ShopItem {
    constructor(item, game) {
        this.item = item
        this.game = game
        this.priceEl = document.createElement("span")
        this.descEl = document.createElement("span")
        this.el = this.#createElement();
    }

    #createElement() {
        const el = document.createElement("span");
        el.classList.add("shop-item");

        const topRow = document.createElement("span");
        topRow.classList.add("shop-item-top");

        const nameEl = document.createElement("span");
        nameEl.classList.add("shop-item-name");
        nameEl.textContent = this.item.name;
        nameEl.addEventListener("click", () => this.game.buy(this.item.id));

        this.priceEl.classList.add("shop-item-price");

        topRow.append(nameEl, this.priceEl);

        const botRow = document.createElement("span");
        botRow.classList.add("shop-item-bot");

        this.descEl.classList.add("shop-item-desc");

        botRow.append(this.descEl);

        el.append(topRow, botRow);

        return el;
    }

    render() {
        this.el.classList.toggle("hidden", !this.game.isRevealed(this.item.id));

        const effect = this.game.effectOf(this.item.id);
        this.descEl.textContent = this.item.description.replace("{X}", effect.toFixed(2));

        const price = this.game.priceOf(this.item.id);
        this.priceEl.textContent = Object.entries(price)
            .map(([resource, n]) => `${n} ${RESOURCES[resource].short}.`)
            .join(", ");
        this.el.classList.toggle("shop-item-unaffordable", !this.game.canAfford(this.item.id));
    }
}