import { eventMixin } from "./event";
const menus = [];

export class Menu {
  constructor(menu, overlay, trigger) {
    Object.assign(this, eventMixin);
    this.el = typeof menu === "string" ? document.querySelector(menu) : menu;
    this.overlay =
      typeof overlay === "string" ? document.querySelector(overlay) : overlay;
    this.trigger =
      typeof trigger === "string" ? document.querySelector(trigger) : trigger;
    this.isOpen = false;
    menus.push(this);
    this.init();
  }
  open() {
    menus.forEach((m) => {
      if (m !== this) {
        m.close();
      }
    });
    this.isOpen = true;
    this.el.classList.add("open");
    this.el.classList.add("opened");
    this.trigger.classList.add("open");
    this.overlay.classList.add("open");
    this.emit("open");
  }
  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.el.classList.remove("opened");
    const listener = () => {
      this.el.classList.remove("open");
      this.el.removeEventListener("transitionend", listener);
    };
    this.el.addEventListener("transitionend", listener);
    this.trigger.classList.remove("open");
    this.overlay.classList.remove("open");
    this.emit("close");
  }
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  init() {
    this.trigger.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggle();
    });
    this.overlay.addEventListener("click", () => {
      this.close();
    });
  }
}
