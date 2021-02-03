import App from "./App.mjs";

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

new App(document.getElementById("App"), columnData);
