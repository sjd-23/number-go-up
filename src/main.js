import { Magnitude } from "./components/magnitude.js";
import { ShopBox } from "./components/shop-box.js";
import { ShopList } from "./components/shop-list.js"
import { ShopItem } from "./components/shop-item.js";
import { Game } from "./game.js";
import { ITEMS } from "./items.js";
import {InventoryBox} from "./components/inventory-box.js";
import {InventoryList} from "./components/inventory-list.js";

const game = new Game();
const container = document.getElementById("game-container")

const magnitude = new Magnitude(container, game);
const shopBox = new ShopBox(container);
const shopList = new ShopList(shopBox);
const inventoryBox = new InventoryBox(container, game);
const inventoryList = new InventoryList(inventoryBox, game);

for (const id in ITEMS) {
    shopList.addItem(new ShopItem(ITEMS[id], game));
}

const views = [magnitude, shopList, inventoryBox, inventoryList];

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