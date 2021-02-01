class MenuBtn {
  constructor(onClick) {
    const btn = document.createElement("button");
    btn.className = "menuBtn";
    btn.innerHTML = "∙∙∙";
    btn.addEventListener("click", onClick);

    return btn;
  }
}

export default MenuBtn;
