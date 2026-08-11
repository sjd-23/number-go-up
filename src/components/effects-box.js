export class EffectsBox {
    constructor(game) {
        this.game = game;
        this.el = this.#createElement();
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("box");

        const titleEl = document.createElement("p");
        titleEl.textContent = "Effects";
        titleEl.classList.add("box-title");
        el.appendChild(titleEl);

        return el;
    }

    render() {
        this.el.classList.toggle("hidden", !this.game.hasAnyItems());
    }
}