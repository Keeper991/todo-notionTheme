import { LS_ITEMS, LS_SELECTEDITEM } from "./Const.mjs";
import ItemMenu from "./Menu.mjs";
import MenuBtn from "./MenuBtn.mjs";

class Item {
  _item = document.createElement("li");
  _id = null;

  constructor(id, column, ItemMenu, value) {
    this._id = id;
    this._item.setAttribute("data-id", id);
    this._item.className = "item";

    const input = document.createElement("input");
    input.placeholder = "내용을 입력하세요.";
    input.value = value ? value : "";

    let data = {
      id: this._id,
      column: column,
      value,
    };

    // value onChange
    let timer = setTimeout(() => null, 1000);
    input.addEventListener("keyup", (e) => {
      clearTimeout(timer);
      const value = e.target.value;
      if (e.code === "Enter") {
        e.target.blur();
        this.setValue(data, value);
      } else {
        timer = setTimeout(() => this.setValue(data, value), 1000);
      }
    });

    this._item.appendChild(input);

    // MenuBtn event
    this._item.appendChild(
      new MenuBtn((e) => {
        const item = JSON.parse(localStorage.getItem(LS_ITEMS)).find(
          (item) => item.id === id
        );
        localStorage.setItem(LS_SELECTEDITEM, JSON.stringify(item));
        ItemMenu.setPosition(e.clientX, e.clientY);
        ItemMenu.active();
      })
    );

    return this._item;
  }
  setValue(data, value) {
    data = JSON.parse(localStorage.getItem(LS_ITEMS)).find(
      (item) => item.id === this._id
    );
    data = { ...data, value };

    let items = JSON.parse(localStorage.getItem(LS_ITEMS));
    if (items) {
      items = items.filter((item) => item.id !== this._id);
      items.push(data);
    } else {
      items = [data];
    }

    localStorage.setItem(LS_ITEMS, JSON.stringify(items));
  }
}

export default Item;
