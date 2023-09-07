import { Controller } from "@hotwired/stimulus";
export default class StickyController extends Controller {
  static targets = ["stickyEl", "container"];
  connect() {}

  stick() {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.matches) {
      const container = this.containerTarget;
      const sidebar = this.stickyElTarget;
      const containerRect = container.getBoundingClientRect();
      const sidebarHeight = sidebar.offsetHeight;

      const containerTop = containerRect.top + window.scrollY;
      const containerBottom =
        containerTop + containerRect.height - sidebarHeight - 100;
      const scrollY = window.scrollY;

      if (scrollY >= containerTop && scrollY <= containerBottom) {
        sidebar.style.position = "fixed";
        sidebar.style.marginTop = "100px";
        sidebar.style.top = "0";
      } else if (scrollY > containerBottom) {
        sidebar.style.position = "absolute";
        sidebar.style.marginTop = "0";
        sidebar.style.top = container.offsetHeight - sidebarHeight - 100 + "px";
      } else {
        sidebar.style.position = "absolute"; 
        sidebar.style.marginTop = "0";
        sidebar.style.top = "auto";
      }
    } else {
      this.stickyElTarget.removeAttribute("style");
    }
  }
}
