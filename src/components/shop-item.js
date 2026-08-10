export class ShopItem {
    constructor(item, game) {
        this.item = item
        this.game = game
        this.priceEl = document.createElement("span")
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

        const descEl = document.createElement("span");
        descEl.classList.add("shop-item-desc");
        descEl.textContent = this.item.description;

        botRow.append(descEl);

        el.append(topRow, botRow);
        return el;
    }

    render() {
        this.priceEl.textContent = `${this.game.priceOf(this.item.id)} pts.`;
        this.el.classList.toggle("shop-item-unaffordable", !this.game.canAfford(this.item.id));
    }
}