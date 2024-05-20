const calendarBeltItem = document.querySelectorAll('.calendarBeltItem')
for (item of calendarBeltItem) {
   let distance =  item.getAttribute('start-span')
   console.log(distance);
    item.style.marginLeft = `${distance * (100 / 7)}%`;
    console.log(item);
}