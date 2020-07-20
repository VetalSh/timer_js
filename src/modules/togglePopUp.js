const togglePopUp = () => {
  const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        // popUpClose = document.querySelector('.popup-close'),
        body = document.querySelector('body');

  popupBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      popup.style.display = 'block';

      // let width = document.documentElement.offsetWidth;
      // console.log('width: ', width);

      // if (width >= 768) {
      //   popupContent.style.left = 0 + 'px';
      //   popupContent.style.top = 0 + 'px';
      //   let flyInterval,
      //       count = 0; 

      //   let flyAnimate = function() {
      //     flyInterval = requestAnimationFrame(flyAnimate);
      //     count++;
      //     if(count < 40){
      //       popupContent.style.left = count * 10 + 'px';
      //       popupContent.style.top = count * 3 + 'px';
      //     } else {
      //       cancelAnimationFrame(flyInterval);
      //     }
      //   };
      //   flyInterval = requestAnimationFrame(flyAnimate);
      // }
      
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

export default togglePopUp;