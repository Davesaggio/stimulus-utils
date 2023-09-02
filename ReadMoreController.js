import { Controller } from "@hotwired/stimulus";

export default class LoadMoreController extends Controller {
  static targets = ["list", "button"];

  connect() {
    this.list = this.listTarget.querySelectorAll("li");
    this.numToShow = this.element.getAttribute("data-numtoshow");
    if (this.hasButtonTarget) {
      this.button = this.buttonTarget;
    }
    this.numInList = this.list.length;
    this.initElement();
  }
  initElement() {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i].classList.add("hide");
      this.list[i].classList.remove("visible");
    }

    for (var i = 0; i < this.numToShow; i++) {
      if (this.list[i]) {
        this.list[i].classList.add("visible");
        this.list[i].classList.remove("hide");
      }
    }
    if (this.numToShow >= this.numInList) {
      // this.button.classList.add("hide");
      this.button.remove();
    }
  }
  openElement() {
    let showing = 0;
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].style.display === "block") {
        showing++;
      }
    }
    for (var i = showing; i < showing + this.list.length; i++) {
      if (this.list[i]) {
        this.list[i].classList.add("visible");
        this.list[i].classList.remove("hide");
      }
    }
  }
  loadMore(e) {
    if (this.hasButtonTarget) {
      if (this.buttonTarget.classList.contains("is-open")) {
        e.currentTarget.classList.remove("is-open");
        this.initElement();
      } else {
        e.currentTarget.classList.add("is-open");
        this.openElement();
      }
    }
  }
}
