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
    if (target !== menu && event.target.tagName !== 'LI') {
      handlerMenu();
      return;
    }
  });
};

export default toggleMenu;