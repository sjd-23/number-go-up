import { Score } from "./components/score.js";
import { ShopBox } from "./components/shop-box.js";
import { ShopList } from "./components/shop-list.js"
import { ShopItem } from "./components/shop-item.js";
import { Game } from "./game.js";
import { ITEMS } from "./items.js";
import {InventoryBox} from "./components/inventory-box.js";
import {InventoryList} from "./components/inventory-list.js";

const game = new Game();
const container = document.getElementById("game-container")

const score = new Score(container, game);
const shopBox = new ShopBox(container);
const shopList = new ShopList(shopBox);
const inventoryBox = new InventoryBox(container, game);
const inventoryList = new InventoryList(inventoryBox, game);

const basicAdditive = new ShopItem(ITEMS["basicAdditive"], game);
shopList.addItem(basicAdditive);

const views = [score, shopList, inventoryBox, inventoryList];
let last = performance.now();

function loop(now) {
    const dt = (now - last) / 1000;
    last = now;
    game.tick(dt);
    for (const view of views) view.render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);