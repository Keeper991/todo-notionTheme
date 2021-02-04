import ItemMenu from "./ItemMenu.mjs";
import MenuBtn from "./MenuBtn.mjs";

class Item {
  _columnName = null;
  _item = document.createElement("li");

  constructor(columnName) {
    this._columnName = columnName;

    this._item.className = "item";

    const input = document.createElement("input");
    input.placeholder = "내용을 입력하세요.";

    this._item.appendChild(input);
    this._item.appendChild(
      new MenuBtn((e) => {
        ItemMenu.setItemData(this);
        ItemMenu.setPosition(e.clientX, e.clientY);
      })
    );

    return this._item;
  }

  get columnName() {
    return this._columnName;
  }

  set columnName(name) {
    this._columnName = name;
  }

  get item() {
    return this._item;
  }
}

export default Item;
