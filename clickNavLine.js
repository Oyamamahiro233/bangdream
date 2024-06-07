const lineBox = document.querySelector(".lineBox");
const spHeaderNav = document.getElementById("spHeaderNav");
let Switch = false;
lineBox.addEventListener("click", () => {
  lineBox.classList.toggle("clickEvent");
  spHeaderNav.classList.toggle('collapse')

    setTimeout(() => {
      spHeaderNav.classList.toggle("in");
    }, 80);

});
window.addEventListener("resize", () => {
  if (window.innerWidth > 1279) {
    spHeaderNav.classList.remove("in");
    lineBox.classList.remove("clickEvent");
  }
});
