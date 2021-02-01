import Column from "./Column.mjs";

class App {
  constructor(app) {
    const toDo = new Column("To Do");
    const doing = new Column("Doing");
    const done = new Column("Done");

    app.appendChild(toDo);
    app.appendChild(doing);
    app.appendChild(done);
  }
}

export default App;
