import Menu from "./Menu.mjs";
import MenuBtn from "./MenuBtn.mjs";

class Item {
  constructor(data) {
    const li = document.createElement("li");
    li.className = "item";

    const input = document.createElement("input");
    input.placeholder = "내용을 입력하세요.";

    li.appendChild(input);
    li.appendChild(new MenuBtn());

    return li;
  }
}

export default Item;
