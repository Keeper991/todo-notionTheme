import { LS_COLUMNS } from "./Const.mjs";
import { LS_ITEMS } from "./Const.mjs";
import CreateBtn from "./CreateBtn.mjs";
import Item from "./Item.mjs";
import Menu from "./Menu.mjs";

class Column {
  constructor({ name, title, itemCnt }, ItemMenu) {
    const column = document.createElement("section");
    column.className = "column";
    column.classList.add(name);

    const header = document.createElement("header");
    header.className = "column__header";
    header.innerHTML = `<span>${title.toUpperCase()}</span>`;

    const count = document.createElement("span");
    count.className = "column__cnt";
    count.innerHTML = itemCnt;

    const ul = document.createElement("ul");

    header.appendChild(count);
    column.appendChild(header);
    column.appendChild(ul);

    column.appendChild(
      new CreateBtn("Item", () => {
        // increase item Count
        let lsColumns = JSON.parse(localStorage.getItem(LS_COLUMNS));
        let targetColumn = lsColumns.find((col) => col.name === name);
        targetColumn = { ...targetColumn, itemCnt: ++targetColumn.itemCnt };
        lsColumns = lsColumns.filter((col) => col.name !== name);
        lsColumns.push(targetColumn);
        lsColumns.sort((a, b) => a.id - b.id);
        localStorage.setItem(LS_COLUMNS, JSON.stringify(lsColumns));
        ++count.innerHTML;

        // create Item
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
