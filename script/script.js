window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),        
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor((timeRemaining / 60 / 60) % 24);
        // day = Math.floor(timeRemaining / 60 /60 / 24);
        return {timeRemaining, hours, minutes, seconds};
    }

    function updateClock() {
      let timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {
        if (timer.hours < 10) {
          timerHours.textContent = '0' + timer.hours;
        } else {
          timerHours.textContent = timer.hours;
        }
        if (timer.minutes < 10) {
          timerMinutes.textContent = '0' + timer.minutes;
        } else {
          timerMinutes.textContent = timer.minutes;
        }
        if (timer.seconds < 10) {
          timerSeconds.textContent = '0' + timer.seconds;
        } else {
          timerSeconds.textContent = timer.seconds;
        }
      } else {
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
        clearInterval(idInterval);
      }
    }
    updateClock();
  }
  let idInterval = setInterval(countTimer, 1000, '22 july 2020');

  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      // if (!menu.style.transform || menu.style.transform === `translate(-100%)`){
      //   menu.style.transform = `translate(0)`;
      // } else {
      //   menu.style.transform = `translate(-100%)`;
      // }
      menu.classList.toggle('active-menu');
    };
    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();

  // popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popUpClose = document.querySelector('.popup-close'),
          body = document.querySelector('body');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';

        let width = document.documentElement.offsetWidth;
        console.log('width: ', width);

        if (width >= 768) {
          popupContent.style.left = 0 + 'px';
          popupContent.style.top = 0 + 'px';
          let flyInterval,
              count = 0; 

          let flyAnimate = function() {
            flyInterval = requestAnimationFrame(flyAnimate);
            count++;
            if(count < 40){
              popupContent.style.left = count * 10 + 'px';
              popupContent.style.top = count * 3 + 'px';
            } else {
              cancelAnimationFrame(flyInterval);
            }
          };
          flyInterval = requestAnimationFrame(flyAnimate);
        }
        
      });
    });    

    popUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };

  togglePopUp();

});