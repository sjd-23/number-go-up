import { Magnitude } from "./components/magnitude.js";
import { ShopBox } from "./components/shop-box.js";
import { ShopList } from "./components/shop-list.js"
import { ShopItem } from "./components/shop-item.js";
import { Game } from "./game.js";
import { ITEMS } from "./items.js";
import { InventoryBox } from "./components/inventory-box.js";
import { InventoryList } from "./components/inventory-list.js";
import { Column } from "./components/column.js";
import { EffectsBox } from "./components/effects-box.js";
import { EffectsList } from "./components/effects-list.js";
import { EffectsItem } from "./components/effects-item.js";
import { EFFECTS } from "./effects.js";

const game = new Game();
const container = document.getElementById("game-container")

const magnitude = new Magnitude(container, game);

const shopBox = new ShopBox();
const shopList = new ShopList(shopBox);
for (const id in ITEMS) {
    shopList.addItem(new ShopItem(ITEMS[id], game));
}

const inventoryBox = new InventoryBox(game);
const inventoryList = new InventoryList(inventoryBox, game);

const effectsBox = new EffectsBox(game);
const effectsList = new EffectsList(effectsBox);
for (const id in EFFECTS) {
    effectsList.addEffect(new EffectsItem(EFFECTS[id], game));
}

const leftColumn = new Column(container, "left", shopBox);
const rightColumn = new Column(container, "right", inventoryBox, effectsBox);

const views = [magnitude, shopList, inventoryBox, inventoryList, effectsBox, effectsList];

let last = performance.now();
function loop(now) {
    const dt = Math.min((now - last) / 1000, 1);
    last = now;
    game.checkItemVisibility();
    game.tick(dt);
    for (const view of views)
        view.render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);