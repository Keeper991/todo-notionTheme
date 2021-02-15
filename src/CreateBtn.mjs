class CreateBtn {
  constructor(type, onClick) {
    const btn = document.createElement("button");
    btn.className = "createBtn";
    btn.innerHTML = `+ Create New ${type}`;
    btn.addEventListener("click", onClick);

    return btn;
  }
}

export default CreateBtn;
