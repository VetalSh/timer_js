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
          main = document.querySelector('main');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    // Используя делегирование пишем обработчик события
    main.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.menu');    
      if (target === btnMenu) {
        menu.classList.add('active-menu');
        return;
      } else {
        menu.classList.remove('active-menu');
        return;
      }
    });
    menu.addEventListener('click', (event) => {
      let target = event.target;
      if (target !== menu) {
        handlerMenu();
        return;
      }
    });
  };
  toggleMenu();

  // popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupContent = document.querySelector('.popup-content'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          // popUpClose = document.querySelector('.popup-close'),
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

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
        }
      }
      
    });
  };

  togglePopUp();

  // Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    
    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }   
    });
  };
  
  tabs();

  // Слайдер

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          // dot = document.querySelectorAll('.dot'),
          dots = document.querySelector('.portfolio-dots'),
          slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
        interval,
        dot = [];
    
    // Создаем точки
    for (let i = 0; i < slide.length; i++) {        
      let newDot = document.createElement('li');
      newDot.classList.add('dot');
      dots.append(newDot);
      dot[i] = newDot;
    }
            
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(1500);

  };

  slider();

  // Наша Команда
  // Необходимо реализовать, чтобы по наведению мышкой менялись фотографии,
  //  а если увести мышку с элемента то возвращается прежнее фото.
  const commandPhoto = document.querySelectorAll('.command__photo');

  commandPhoto.forEach((item) => {
    const oldImg = item.src; // Запоминаем старую картинку
    item.addEventListener('mouseenter', (e) => {
      event.target.src = event.target.dataset.img;
    });
    item.addEventListener('mouseout', (event) => {
      event.target.src = oldImg;
    });
  });

  // калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'), 
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

    // Функция проверки введенного значения
    // Если число - пропускает, буквы - удаляет
    const checkValue = (target) => {
    let inputChar = target.value;
    target.value = inputChar.replace(/\D/g, '');
    };

    // В калькуляторе разрешить ввод только цифр
    // Обработчик события навешиваем на родительский класс
    calcBlock.addEventListener('input', (event) => {
    let target = event.target;

    if (target.matches('.calc-square')) {
      checkValue(calcSquare);
      return;
    } else if (target.matches('.calc-count')) {
      checkValue(calcCount);
      return;
    } else if (target.matches('.calc-day')) {
      checkValue(calcDay);
      return;
    }
    });

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }

      totalValue.textContent = total;      
    };

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      // if (target.matches('.calc-type') || target.matches('.calc-square') ||
      // target.matches('.calc-day') || target.matches('.calc-count')) {
      //   console.log(1);
      // }

      // if (target === calcType || target === calcSquare ||
      //   target === calcDay || target === calcCount) {
      //     console.log(1);
      //   }

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }

    });
  };

  calc(100);

  // send-ajax-form

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const form = document.getElementById('form1'),
          form2 = document.getElementById('form2'),
          form3 = document.getElementById('form3');

    const statusMessage = document.createElement('div');
    // statusMessage.textContent = 'Тут будет сообщение';
    statusMessage.style.cssText = 'font-size: 2rem;';
    // form.appendChild(statusMessage);

    // Функции проверки корректного ввода символов в формы
    const checkForm1 = (event) => {
      let target = event.target;
      if (target.matches('#form1-phone')) {
        target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
        // maskPhone('#form1-phone');
      } else
      if (target.matches('#form1-name')) {
        target.value = target.value.replace(/[^а-яё\s]/gi, '');
      }
    };

    const checkForm2 = (event) => {
      let target = event.target;
      if (target.matches('#form2-phone')) {
        target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
        // maskPhone('#form2-phone');
      } else
      if (target.matches('#form2-name') || target.matches('#form2-message')) {
        target.value = target.value.replace(/[^а-яё\s]/gi, '');
      }
    };

    const checkForm3 = (event) => {
      let target = event.target;
      if (target.matches('#form3-phone')) {
        target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
        // maskPhone('#form3-phone');
      } else
      if (target.matches('#form3-name')) {
        target.value = target.value.replace(/[^а-яё\s]/gi, '');
      }
    };

    // Обработчики событий корректного ввода данных в форму
    form.addEventListener('change', checkForm1);
    form2.addEventListener('change', checkForm2);
    form3.addEventListener('change', checkForm3);
    
    // Форма1
    form.addEventListener('submit', (event) => {            
      event.preventDefault();
      form.appendChild(statusMessage);      
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form);
      let body = {};
      // 1 case
      // for (let val of formData.entries()) {
      //   body[val[0]] = val[1];
      // }
      // 2 case
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body,
         () => {
        statusMessage.textContent = successMessage;
        clearForm1();
      }, (error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearForm1();
      });
    });
    // Функция очистки формы1
    const clearForm1 = () => {      
      const form1Name = document.getElementById('form1-name'),
            form1Email = document.getElementById('form1-email'),
            form1Phone = document.getElementById('form1-phone');

      form1Name.value = '';
      form1Email.value = '';
      form1Phone.value = '';
    };

    // Форма2
    form2.addEventListener('submit', (event) => {
      event.preventDefault();
      form2.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form2);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body,
         () => {
        statusMessage.textContent = successMessage;
        clearForm2();
      }, (error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearForm2();
      });
    });
    // Функция очистки формы2
    const clearForm2 = () => {      
      const form2Name = document.getElementById('form2-name'),
            form2Email = document.getElementById('form2-email'),
            form2Phone = document.getElementById('form2-phone'),
            form2Message = document.getElementById('form2-message');

      form2Name.value = '';
      form2Email.value = '';
      form2Phone.value = '';
      form2Message.value = '';
    };

    // Модальное окно, форма3
    form3.addEventListener('submit', (event) => {
      event.preventDefault();
      form3.appendChild(statusMessage);
      statusMessage.textContent = loadMessage;
      const formData = new FormData(form3);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });
      postData(body,
         () => {
           statusMessage.textContent = successMessage;
           clearForm3();
         }, (error) => {
           console.error(error);
           statusMessage.textContent = errorMessage;
           clearForm3();
         });
    });
    // Функция очистки формы3
    const clearForm3 = () => {
      const form3Name = document.getElementById('form3-name'),
            form3Email = document.getElementById('form3-email'),
            form3Phone = document.getElementById('form3-phone');

      form3Name.value = '';
      form3Email.value = '';
      form3Phone.value = '';
    };

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });
      
      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      request.send(JSON.stringify(body));
    };

  };

  sendForm();

});