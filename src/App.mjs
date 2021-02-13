import Column from "./Column.mjs";
import Menu from "./Menu.mjs";
import { LS_COLUMNS, LS_SELECTEDITEM, LS_ITEMS } from "./Const.mjs";
import Item from "./Item.mjs";

class App {
  constructor(app) {
    const columnData = JSON.parse(localStorage.getItem(LS_COLUMNS));

    const ItemMenu = new Menu({
      parent: app,
      menuList: [
        {
          type: "select",
          name: "Status",
          handler: {
            change: function () {
              // get column to move
              const toColumn = this.options[this.selectedIndex].className.split(
                "__"
              )[1];

              const { id, column, value } = JSON.parse(
                localStorage.getItem(LS_SELECTEDITEM)
              );
              const item = { id, column: toColumn, value };
              const items = JSON.parse(localStorage.getItem(LS_ITEMS)).filter(
                (item) => item.id !== id
              );
              items.push(item);
              localStorage.setItem(LS_ITEMS, JSON.stringify(items));

              // delete li from current column
              const li = document.querySelector(`.${column} [data-id="${id}"]`);
              const list = document.querySelector(`.${column} ul`);
              list.removeChild(li);

              // add li to selected column
              const toList = document.querySelector(`.${toColumn} ul`);
              toList.prepend(li);
            },
          },
          data: {
            options: columnData,
          },
        },
        {
          type: "select",
          name: "Color",
          handler: {
            change: null,
          },
          data: {
            options: [],
          },
        },
        {
          name: "Delete",
          handler: {
            click: () => {
              const { id, column } = JSON.parse(
                localStorage.getItem(LS_SELECTEDITEM)
              );

              // delete item in localStorage
              const items = JSON.parse(localStorage.getItem(LS_ITEMS)).filter(
                (item) => item.id !== id
              );
              localStorage.setItem(LS_ITEMS, JSON.stringify(items));

              // delete item in column
              const li = document.querySelector(`.${column} [data-id="${id}"]`);
              const list = document.querySelector(`.${column} ul`);
              list.removeChild(li);
            },
          },
        },
      ],
    });

    columnData.map((cd) => {
      app.appendChild(new Column(cd, ItemMenu));
    });

    // load localStorage
    const items = JSON.parse(localStorage.getItem(LS_ITEMS));
    if (items) {
      items.map((item) => {
        const columnUl = document.querySelector(`.${item.column} ul`);
        columnUl.prepend(new Item(item.id, item.column, ItemMenu, item.value));
      });
    }
  }
}

export default App;
