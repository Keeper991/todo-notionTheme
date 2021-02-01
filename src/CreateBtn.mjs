class CreateBtn {
  constructor(column) {
    const btn = document.createElement("button");
    btn.className = "createBtn";
    btn.innerHTML = "+ Create New Item";

    column.appendChild(btn);
  }
}

export default CreateBtn;
