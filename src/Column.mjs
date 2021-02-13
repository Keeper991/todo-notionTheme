import { LS_ITEMS } from "./Const.mjs";
import CreateBtn from "./CreateBtn.mjs";
import Item from "./Item.mjs";

class Column {
  constructor({ name, title }, ItemMenu) {
    const column = document.createElement("section");
    column.className = "column";
    column.classList.add(name);

    const header = document.createElement("header");
    header.className = "column__header";
    header.innerHTML = `<span>${title.toUpperCase()}</span>`;

    const ul = document.createElement("ul");

    column.appendChild(header);
    column.appendChild(ul);

    column.appendChild(
      new CreateBtn(() => {
        const id = Date.now();
        const data = { id, column: name, value: "" };
        const items = JSON.parse(localStorage.getItem(LS_ITEMS));
        if (items) {
          items.push(data);
          localStorage.setItem(LS_ITEMS, JSON.stringify(items));
        } else {
          localStorage.setItem(LS_ITEMS, JSON.stringify([data]));
        }
        ul.prepend(new Item(id, name, ItemMenu));
      })
    );

    return column;
  }
}

export default Column;
