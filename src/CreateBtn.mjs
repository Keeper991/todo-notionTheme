class CreateBtn {
  constructor(onClick) {
    const btn = document.createElement("button");
    btn.className = "createBtn";
    btn.innerHTML = "+ Create New Item";
    btn.addEventListener("click", onClick);

    return btn;
  }
}

export default CreateBtn;
