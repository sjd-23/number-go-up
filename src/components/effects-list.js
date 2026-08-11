export class EffectsList {
    constructor(effectsBox) {
        this.effectsBox = effectsBox;
        this.effects = [];
        this.el = this.#createElement();
        this.effectsBox.el.append(this.el);
    }

    #createElement() {
        const el = document.createElement("div");
        el.classList.add("effects-list");
        return el;
    }

    addEffect(effect) {
        this.effects.push(effect);
        this.el.append(effect.el);
    }

    render() {
        for (const effect of this.effects) { effect.render(); }
    }
}