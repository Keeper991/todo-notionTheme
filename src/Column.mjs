import CreateBtn from "./CreateBtn.mjs";
import Item from "./Item.mjs";

class Column {
  constructor(name) {
    const column = document.createElement("section");
    column.className = "column";

    const header = document.createElement("header");
    header.className = "column__header";
    header.innerHTML = name.toUpperCase();

    const ul = document.createElement("ul");

    column.appendChild(header);
    column.appendChild(ul);

    column.appendChild(new CreateBtn(() => ul.prepend(new Item())));

    return column;
  }
}

export default Column;
