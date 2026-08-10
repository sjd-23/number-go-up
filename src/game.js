import { ITEMS } from "./items.js";

export class Game {
    constructor() {
        this.score = 0;
        this.clickScore = 1;
        this.owned = {};

        for (const id in ITEMS) {
            this.owned[id] = 0;
        }
    }

    hasAnyItems() {
        for (const id in this.owned) {
            if (this.owned[id] > 0) return true;
        }

        return false;
    }

    priceOf(id) {
        const item = ITEMS[id];
        return Math.ceil(item.baseValue * Math.pow(item.valueScale, this.owned[id]))
    }

    canAfford(id) {
        return this.score >= this.priceOf(id);
    }

    buy(id) {
        if (!this.canAfford(id)) return false;

        this.score -= this.priceOf(id);
        this.owned[id] += 1;
        return true;
    }

    perSecond() {
        let total = 0;

        for (const id in ITEMS) {
            const item = ITEMS[id];
            total += (item.amount / item.interval) * this.owned[id];
        }

        return total;
    }

    click() {
        this.score += this.clickScore;
    }

    tick(seconds) {
        this.score += this.perSecond() * seconds;
    }
}