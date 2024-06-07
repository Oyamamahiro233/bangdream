const calendarBeltItem = document.querySelectorAll(".calendarBeltItem");
const calendarRow = document.querySelector(".calendarRow");
const calendarItem = document.querySelectorAll("a.calendarItem");

function Hdefault(height) {
  for (let i = 0; i < calendarItem.length; i++) {
    const element = calendarItem[i];
    element.style.height = height[i] + 5   + "px";

  }
}
for (item of calendarBeltItem) {
  let distance = item.getAttribute("start-span");
  console.log(distance);
  item.style.marginLeft = `${distance * (100 / 7)}%`;
  console.log(item);
}
window.addEventListener("resize", () => {
  let width = window.innerWidth;
  if (width < 1276 && width > 786) {
    calendarRow.style.height = "251px";
    return;
  } else if (width < 768) {
    calendarRow.style.height = "284px";
    return;
  }
});
