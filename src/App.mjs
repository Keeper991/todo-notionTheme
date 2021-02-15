import Column from "./Column.mjs";
import Menu from "./Menu.mjs";
import { LS_COLUMNS, LS_SELECTEDITEM, LS_ITEMS } from "./Const.mjs";
import Item from "./Item.mjs";
import CreateBtn from "./CreateBtn.mjs";

class App {
  constructor(titleData, app) {
    const columnData = JSON.parse(localStorage.getItem(LS_COLUMNS));

    const ItemMenu = new Menu({
      name: "itemMenu",
      parent: app,
      menuList: [
        {
          type: "select",
          name: "Status",
          handler: {
            change: function () {
              // get column to move
              const toColumn = this.value;

              const { id, column: fromColumn, value } = JSON.parse(
                localStorage.getItem(LS_SELECTEDITEM)
              );
              const item = { id, column: toColumn, value };
              const items = JSON.parse(localStorage.getItem(LS_ITEMS)).filter(
                (item) => item.id !== id
              );
              items.push(item);
              localStorage.setItem(LS_ITEMS, JSON.stringify(items));

              // delete li from current column
              const li = document.querySelector(
                `.${fromColumn} [data-id="${id}"]`
              );
              const list = document.querySelector(`.${fromColumn} ul`);
              list.removeChild(li);

              // add li to selected column
              const toList = document.querySelector(`.${toColumn} ul`);
              toList.prepend(li);

              // update column cnt in localStorage
              let lsColumns = JSON.parse(localStorage.getItem(LS_COLUMNS));

              let lsToColumn;
              let lsFromColumn;
              lsColumns.forEach((col) => {
                if (col.name === toColumn) lsToColumn = col;
                else if (col.name === fromColumn) lsFromColumn = col;
              });

              ++lsToColumn.itemCnt;
              --lsFromColumn.itemCnt;

              lsColumns = lsColumns.filter(
                (col) => col.name !== toColumn && col.name !== fromColumn
              );
              lsColumns = [...lsColumns, lsToColumn, lsFromColumn];
              lsColumns.sort((a, b) => a.id - b.id);

              localStorage.setItem(LS_COLUMNS, JSON.stringify(lsColumns));

              // update column count in html
              const eleToColumnCnt = document.querySelector(
                `.${toColumn} .column__cnt`
              );
              const eleFromColumnCnt = document.querySelector(
                `.${fromColumn} .column__cnt`
              );

              ++eleToColumnCnt.innerHTML;
              --eleFromColumnCnt.innerHTML;
            },
          },
          data: {
            options: columnData,
          },
        },
        // {
        //   type: "select",
        //   name: "Color",
        //   handler: {
        //     change: null,
        //   },
        //   data: {
        //     options: [],
        //   },
        // },
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

    // const ColumnMenu = new Menu({
    //   name: "columnMenu",
    //   parent: app,
    //   menuList: [
    //     {
    //       type: "select",
    //       name: "Color",
    //       handler: {
    //         change: null,
    //       },
    //       data: {
    //         options: [],
    //       },
    //     },
    //     {
    //       name: "Delete",
    //       handler: {},
    //     },
    //   ],
    // });

    // set app title
    const { title, description } = titleData;

    const appTitle = document.createElement("div");
    appTitle.className = "app-title";
    appTitle.innerHTML = `<h1><img src="src/img/notion-logo.png" alt="notion logo"></img>${title}</h1><div>${description}</div>`;

    app.appendChild(appTitle);

    // set column box
    const columnBox = document.createElement("div");
    columnBox.className = "column-box";
    app.appendChild(columnBox);

    // set columns
    columnData.map((cd) => {
      columnBox.appendChild(new Column(cd, ItemMenu));
    });

    // set create column btn
    // const createSection = document.createElement("section");
    // const createBtn = new CreateBtn("Column", () => {
    //   const newData = { name: "new", title: "New" };
    //   columnBox.insertBefore(new Column(newData, ItemMenu), createSection);

    //   const columns = JSON.parse(localStorage.getItem(LS_COLUMNS));
    //   localStorage.setItem(LS_COLUMNS, JSON.stringify(columns.push(newData)));
    // });

    // createSection.appendChild(createBtn);
    // columnBox.appendChild(createSection);

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
