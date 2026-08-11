export class Magnitude {
    constructor(container, game) {
        this.game = game;
        this.el = this.#createElement();
        container.append(this.el);
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("magnitude");
        el.textContent = "0";

        el.addEventListener("click", () => this.game.click());

        return el;
    }

    render() {
        this.el.textContent = Math.floor(this.game.resources.magnitude);
    }
}