const scrollContentBtn = document.querySelector(".scrollContentBtn");

scrollContentBtn.addEventListener("click", () => {
  const { top } = scrollContentBtn.getBoundingClientRect();
  console.log(scrollContentBtn.getBoundingClientRect());
  window.scrollBy(0, top);
});
