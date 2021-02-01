import Column from "./Column.mjs";

class App {
  constructor(app) {
    const toDo = new Column(app, "To Do");
    const doing = new Column(app, "Doing");
    const done = new Column(app, "Done");

    toDo.setColumn(null, done);
    doing.setColumn(toDo, done);
    done.setColumn(doing, null);
  }
}

export default App;
