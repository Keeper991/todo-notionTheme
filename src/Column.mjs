import CreateBtn from "./CreateBtn.mjs";
import Item from "./Item.mjs";

class Column {
  constructor({ name, title }) {
    const column = document.createElement("section");
    column.className = "column";
    column.classList.add(name);

    const header = document.createElement("header");
    header.className = "column__header";
    header.innerHTML = title.toUpperCase();

    const ul = document.createElement("ul");

    column.appendChild(header);
    column.appendChild(ul);

    column.appendChild(new CreateBtn(() => ul.prepend(new Item(name))));

    return column;
  }
}

export default Column;
