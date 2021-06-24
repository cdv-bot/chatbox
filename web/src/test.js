makeSlideShow('.slider__content');
makeSlideShow('.information__slide');

function makeSlideShow (slide) {
  const mySlide = document.querySelectorAll(slide),
    dotSlide = document.querySelectorAll(`${slide}-dot`),
    prev = document.querySelector('.btn-prev'),
    next = document.querySelector('.btn-next');

  let counter = 1;
  counter = navigateSlide(counter, mySlide, dotSlide);
  let timer = setInterval(auto, 5000);

  // function auto() {
  //     counter = autoSlide(counter);
  //     counter = navigateSlide(counter, mySlide, dotSlide);
  // }

  prev.addEventListener('click', function () {
    counter += -1;
    counter = navigateSlide(counter, mySlide, dotSlide);
    resetTimer();
  });

  next.addEventListener('click', function () {
    counter += 1;
    counter = navigateSlide(counter, mySlide, dotSlide);
    resetTimer();
  });

  for (let i = 0; i < dotSlide.length; i++) {
    dotSlide[i].addEventListener('click', function () {
      counter = i + 1;
      navigateSlide(counter, mySlide, dotSlide);
      resetTimer();
    });
  }

  function resetTimer () {
    clearInterval(timer);
    timer = setInterval(auto, 5000);
  }
}

function navigateSlide (counter, mySlide, dotSlide) {
  let i;
  for (i = 0; i < mySlide.length; i++) {
    mySlide[i].style.display = 'none';
  }
  for (i = 0; i < dotSlide.length; i++) {
    dotSlide[i].className = dotSlide[i].className.replace(' active-slide', '');
  }
  if (counter > mySlide.length) {
    counter = 1;
  }
  if (counter < 1) {
    counter = mySlide.length;
  }
  mySlide[counter - 1].style.display = 'block';
  dotSlide[counter - 1].className += ' active-slide';
  return counter;
}

function autoSlide (counter) {
  counter += 1;
  return counter;
}
