export class Tags {
  constructor(el) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    this.tags = this.el.querySelectorAll(".tags-item");
    this.moreBtn = this.el.querySelector(".tags-more");
    if (this.moreBtn) {
      this.moreTextEl = this.moreBtn.querySelector("span");
      this.lessText = this.moreBtn.getAttribute("data-less");
      this.moreText = this.moreTextEl.innerHTML;
    }
    this.isOpen = false;
    this.init();
  }
  showMore() {
    this.isOpen = true;

    this.el.classList.add("open");
    this.el.classList.add('opened')
    this.moreTextEl.innerHTML = this.lessText;
  }
  hideMore() {
    this.isOpen = false;
    this.el.classList.remove("open");
    this.moreTextEl.innerHTML = this.moreText;
  }
  toggle() {
    if (this.isOpen) {
      this.hideMore();
    } else {
      this.showMore();
    }
  }
  init() {
    if (this.moreBtn) {
      this.moreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle();
      });
    }
  }
}
