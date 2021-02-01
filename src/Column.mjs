import CreateBtn from "./CreateBtn.mjs";

class Column {
  _name = "";
  _lCol = null;
  _rCol = null;
  _list = [];

  constructor(app, name) {
    this._name = name;

    const column = document.createElement("section");
    column.className = "column";

    const header = document.createElement("header");
    header.innerHTML = this._name.toUpperCase();

    column.appendChild(header);
    app.appendChild(column);

    new CreateBtn(column);
  }

  setColumn(lCol, rCol) {
    this._lCol = lCol;
    this._rCol = rCol;
  }

  pushList(item) {
    this._list.push(item);
  }

  popList(item) {
    return this._list.find((i) => i === item);
  }
}

export default Column;
