export class EffectsItem {
    constructor(effect, game) {
        this.effect = effect;
        this.game = game;
        this.dataEl = document.createElement("span");
        this.el = this.#createElement();
    }

    #createElement() {
        const el = document.createElement("span");
        el.classList.add("effect-item");

        const effectRowEl = document.createElement("span");
        effectRowEl.classList.add("effect-row");

        const nameEl = document.createElement("span");
        nameEl.textContent = this.effect.name;
        nameEl.classList.add("effect-name");

        this.dataEl.classList.add("effect-data");
        this.dataEl.textContent = "0";

        effectRowEl.append(nameEl, this.dataEl);

        el.append(effectRowEl);

        return el;
    }

    render() {
        let effectData = 0;

        if (this.effect.type === 'perSecond') {
            effectData = this.game.perSecond(this.effect.resource);
        } else if (this.effect.type === 'clickPower') {
            effectData = this.game.clickPower();
        } else if (this.effect.type === 'outputMult') {
            effectData = this.game.multiplierFor();
        }

        this.dataEl.textContent = effectData.toFixed(2);
    }
}