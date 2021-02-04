import App from "./App.mjs";
import { LS_COLUMNS } from "./Const.mjs";

const columnData = [
  {
    name: "todo",
    title: "To Do",
  },
  {
    name: "doing",
    title: "Doing",
  },
  {
    name: "done",
    title: "Done",
  },
];

localStorage.setItem(LS_COLUMNS, JSON.stringify(columnData));
new App(document.getElementById("App"));
