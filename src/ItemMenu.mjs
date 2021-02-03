import App from "./App.mjs";

class ItemMenu {
  _menu = document.createElement("div");
  _select = document.createElement("select");
  _itemInst = null;
  _item = null;
  _columnName = null;

  constructor() {
    this._menu.className = "menu-wrapper";
    this._menu.addEventListener("click", (e) => {
      if (e.target === this._menu) this._menu.classList.remove("active");
    });

    this._select.addEventListener("change", () => this.handleSelect());

    const menuUl = document.createElement("ul");
    menuUl.className = "menu";

    const selectLi = document.createElement("li");

    const deleteLi = document.createElement("li");
    deleteLi.innerHTML = "Delete";
    deleteLi.addEventListener("click", () => this.handleDelete());

    selectLi.appendChild(this._select);
    menuUl.appendChild(selectLi);
    menuUl.appendChild(deleteLi);
    this._menu.appendChild(menuUl);
  }

  setItemData(itemInst) {
    this._itemInst = itemInst;
    this._item = itemInst.item;
    this._columnName = itemInst.columnName;
    this._select.querySelector(`.opt__${this._columnName}`).selected = true;

    // active item menu
    this._menu.classList.add("active");
  }

  setColumnData(columnData) {
    this._select.innerHTML = "";

    columnData.map((cd) => {
      this._select.innerHTML += `<option class=opt__${cd.name}>${cd.title}</option>`;
    });
  }

  attatchParent(parent) {
    parent.appendChild(this._menu);
  }

  handleSelect() {
    const curList = document.querySelector(`.column.${this._columnName} ul`);
    curList.removeChild(this._item);

    const selectedName = this._select.options[
      this._select.selectedIndex
    ].className.split("__")[1];

    const nextList = document.querySelector(`.column.${selectedName} ul`);
    nextList.prepend(this._item);

    this._columnName = selectedName;
    this._itemInst.columnName = selectedName;
  }

  handleDelete() {
    const curList = document.querySelector(`.column.${this._columnName} ul`);
    curList.removeChild(this._item);

    delete this._itemInst;
    this._menu.classList.remove("active");
  }
}

export default new ItemMenu();
