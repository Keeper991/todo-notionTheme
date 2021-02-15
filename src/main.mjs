import App from "./App.mjs";
import { LS_COLUMNS } from "./Const.mjs";

const columnData = [
  {
    id: 1,
    name: "todo",
    title: "To Do",
    itemCnt: 0,
  },
  {
    id: 2,
    name: "doing",
    title: "Doing",
    itemCnt: 0,
  },
  {
    id: 3,
    name: "done",
    title: "Done",
    itemCnt: 0,
  },
];

if (!localStorage.getItem(LS_COLUMNS))
  localStorage.setItem(LS_COLUMNS, JSON.stringify(columnData));

const titleData = {
  title: "Task List",
  description: "Use this template to track your personal tasks.",
};
new App(titleData, document.getElementById("App"));
