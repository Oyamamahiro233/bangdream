

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swipe-container", {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      // resizeObserver: true,
      on: {
          resize: function () {
              console.log(this.width);
              if (this.width < 768) {
                  this.params.slidesPerView = 1
                  this.update()
              } else {
                  this.params.slidesPerView = 2
                  this.update()
              }
          },
      },
      autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
      },
      pagination: {
          el: '.swiper-pagination',
          bulletClass: 'swiper-pagination-bullet',
          clickableClass: 'swiper-pagination-clickable'

      },
  });

  document.querySelector('.swiper-prev').onclick = function () {
      swiper.slidePrev();
  }
  document.querySelector('.swiper-next').onclick = function () {
      swiper.slideNext();
  }

});