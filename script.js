
const sliders = document.querySelectorAll(".slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
const testBtn = document.querySelector(".test-btn");
const sliderContainer = document.querySelector(".slider-container");
const videoBg = document.querySelector(".video-bg");
const cardSliderPrevBtn = document.querySelector(".card-slider-prev-btn");
const cardSliderNxtBtn = document.querySelector(".card-slider-next-btn");


const sliderLength = sliders.length - 1;
const indicatorWidth = (100 / sliders.length).toFixed(2);
indicator.style.width = `${indicatorWidth}%`;

let currentIndex = 0;
let intervalId;
let setTimeoutId;
let lastClickNextBtn = 0;
let lastClickPrevBtn = 0;
let startX = 0;
let endX = 0;
let isDragging = false;

videoBg.playbackRate = 0.9;
sliderContainer.addEventListener("pointerdown", (e) => {
  isDragging = true;
  startX = e.clientX;

});
sliderContainer.addEventListener("pointermove", (e) => {
  if (!isDragging) { return };
  e.preventDefault();
  endX = e.clientX;

  
  
});
sliderContainer.addEventListener("pointerup", (e) => {
  isDragging = false;
  if (endX == 0) startX = 0;
  const distance = endX - startX;
  if (Math.abs(distance) < 70) return;
  if (distance < 0) nextBtn.click();
  else prevBtn.click();

  startX = 0;
  endX = 0;


});

nextBtn.addEventListener("click", (e) => {
  clearInterval(intervalId);
  currentIndex++;
  if (currentIndex > sliderLength) currentIndex = 0;
  slideChange(currentIndex, "right");
  autoChangeSlide();

});

prevBtn.addEventListener("click", (e) => {
  clearInterval(intervalId);
  currentIndex--;
  if (currentIndex < 0) currentIndex = sliderLength;
  slideChange(currentIndex, "left");
  autoChangeSlide();


});

function slideChange(currentIndex, direction = "right") {

  [...sliders].forEach(slider => {
    slider.classList.remove("animate-right", "active", "animate-left");
  });

  if (direction === "right") sliders[currentIndex].classList.add("animate-right");
  else sliders[currentIndex].classList.add("animate-left");

  sliders[currentIndex].classList.add("active");
  updateIndicator(currentIndex, direction);
}
function updateIndicator(index, direction) {
  if (index === 0 || (direction === "left" && index == sliderLength)) indicator.style.transition = "none";
  else indicator.style.transition = "left .6s ease-in-out";
  indicator.style.left = `${index * indicatorWidth}%`;
}


function autoChangeSlide() {
  intervalId = setInterval(() => {
    currentIndex++;
    if (currentIndex > sliderLength) currentIndex = 0;
    slideChange(currentIndex);
  }, 2900);

}



//swiper js initializer
var swiper = new Swiper(".slide-container", {
  slidesPerView: 4,
  spaceBetween: 12,
  sliderPerGroup: 4,
  loop: false,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: cardSliderNxtBtn,
    prevEl: cardSliderPrevBtn,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 4,
    },
  },
});





//initalizer
(function () {
  slideChange(currentIndex);
  autoChangeSlide();
})();


