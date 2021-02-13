class ItemMenu {
  _menu = document.createElement("ul");
  _overlay = document.createElement("div");

  constructor(config) {
    this._overlay.className = "menu-overlay";
    this._overlay.addEventListener("click", () => this.inactive());

    this._menu.className = "menu";

    const { parent, menuList } = config;

    if (parent) {
      parent.appendChild(this._overlay);
      parent.appendChild(this._menu);
    }

    if (menuList) {
      menuList.map((menu) => {
        const li = document.createElement("li");
        li.className = menu.name.toLowerCase().replace(" ", "");
        li.innerHTML = menu.name ? menu.name : "";

        switch (menu.type) {
          case "select":
            const { options } = menu.data;
            const select = document.createElement("select");
            select.innerHTML = "";
            for (const handler in menu.handler) {
              select.addEventListener(`${handler}`, menu.handler[handler]);
            }
            select.addEventListener("change", () => this.inactive());

            options.map((opt) => {
              select.innerHTML += `<option class=opt__${opt.name}>${opt.title}</option>`;
            });

            li.classList.add("li-select");
            li.appendChild(select);
            break;

          default:
            if (menu.handler) {
              for (const event in menu.handler) {
                li.addEventListener(event, menu.handler[event]);
                li.addEventListener("click", () => this.inactive());
              }
            }
            break;
        }

        this._menu.appendChild(li);
      });
    }

    return {
      active: () => {
        this._menu.classList.add("active");
        this._overlay.classList.add("active");
      },
      setPosition: (x, y) => {
        if (y + this._menu.offsetHeight > window.innerHeight) {
          this._menu.style.top = `${y - this._menu.offsetHeight}px`;
        } else {
          this._menu.style.top = `${y}px`;
        }

        if (x + this._menu.offsetWidth > window.innerWidth) {
          this._menu.style.left = `${x - this._menu.offsetWidth}px`;
        } else {
          this._menu.style.left = `${x}px`;
        }
      },
    };
  }

  inactive() {
    this._menu.classList.remove("active");
    this._overlay.classList.remove("active");
  }
}

export default ItemMenu;
