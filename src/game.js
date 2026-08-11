import { ITEMS } from "./items.js";
import { RESOURCES } from "./resources.js";

export class Game {
    constructor() {
        this.resources = {};
        for (const id in RESOURCES) {
            this.resources[id] = 0;
        }

        this.owned = {};
        for (const id in ITEMS) {
            this.owned[id] = 0;
        }

        this.revealed = {};
        for (const id in ITEMS) {
            this.revealed[id] = false;
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
        const scale = Math.pow(item.priceScale, this.owned[id]);
        const price = {};

        for (const resource in item.basePrice) {
            price[resource] = Math.ceil(item.basePrice[resource] * scale);
        }

        return price;
    }

    canAfford(id) {
        const price = this.priceOf(id);

        for (const resource in price) {
            if (this.resources[resource] < price[resource]) return false;
        }

        return true;
    }

    canReveal(id) {
        const item = ITEMS[id];

        if (item.toReveal.type === 'amount') {
            if (item.toReveal.amount > this.resources[item.toReveal.resource]) return false;
        }

        return true;
    }

    isRevealed(id) { return this.revealed[id]; }

    effectOf(id) {
        const item = ITEMS[id];

        if (item.type === 'incrementor') {
            return (item.amount / item.interval) * this.multiplierFor(item.produces);
        }

        if (item.type === 'clickPower') {
            return item.amount + (item.percent / 100) * this.perSecond('magnitude');
        }

        return item.amount;
    }

    multiplierFor() {
        let multiplier = 1;

        for (const id in ITEMS) {
            const item = ITEMS[id];
            if (item.type !== 'multiplier') continue;
            multiplier *= Math.pow(item.amount, this.owned[id]);
        }

        return multiplier;
    }

    buy(id) {
        if (!this.canAfford(id)) return false;

        const price = this.priceOf(id);
        for (const resource in price) {
            this.resources[resource] -= price[resource];
        }

        this.owned[id] += 1;
        return true;
    }

    perSecond(resource) {
        let base = 0;

        for (const id in ITEMS) {
            const item = ITEMS[id];
            if (item.type !== 'incrementor') continue;
            if (item.produces !== resource) continue;
            base += (item.amount / item.interval) * this.owned[id];
        }

        return base * this.multiplierFor(resource);
    }

    clickPower() {
        let total = 1;

        for (const id in ITEMS) {
            if (ITEMS[id].type !== 'clickPower') continue;
            total += this.effectOf(id) * this.owned[id];
        }

        return total;
    }

    click() {
        this.resources.magnitude += this.clickPower();
    }

    tick(seconds) {
        for (const id in RESOURCES) {
            this.resources[id] += this.perSecond(id) * seconds;
        }
    }

    checkItemVisibility() {
        for (const id in ITEMS) {
            if (this.canReveal(id)) this.revealed[id] = true;
        }
    }
}