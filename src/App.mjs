import Column from "./Column.mjs";
import ItemMenu from "./ItemMenu.mjs";

class App {
  constructor(app, columnData) {
    columnData.map((cd) => {
      app.appendChild(new Column(cd));
    });

    ItemMenu.attatchParent(app);
    ItemMenu.setColumnData(columnData);
  }
}

export default App;
