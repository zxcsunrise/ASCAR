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

const testimonialsSwiper = new Swiper(".testimonialsSwiper", {
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  slidesPerView: 1.5,
  spaceBetween: 40,
});