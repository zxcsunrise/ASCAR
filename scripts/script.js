const textElement = document.querySelector('.sliding-text');

function resetAnimation() {
  textElement.style.animation = 'none';
  void textElement.offsetWidth;
  textElement.style.animation = 'slideLeft 10s linear infinite';
}

textElement.addEventListener('mouseenter', () => {
  textElement.style.animationPlayState = 'paused';
});

textElement.addEventListener('mouseleave', () => {
  textElement.style.animationPlayState = 'running';
});

document.addEventListener('DOMContentLoaded', function () {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', function () {
      const content = this.nextElementSibling;

      document.querySelectorAll('.accordion-content').forEach(item => {
        if (item !== content) {
          item.style.display = 'none';
        }
      });

      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
});


const testimonialsSwiper = new Swiper(".testimonialsSwiper", {
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  slidesPerView: 1.5,
  spaceBetween: 40,
});
const interiorSwiper = new Swiper(".interiorSwiper", {
  pagination: {
    el: ".swiper-pagination",
  },
   navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});