const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const form = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');

  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'font-size: 2rem;';
  // form.appendChild(statusMessage);

  // Функции проверки корректного ввода символов в формы
  const checkForm1 = (event) => {
    let target = event.target;
    if (target.matches('#form1-phone')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#form1-name')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };

  const checkForm2 = (event) => {
    let target = event.target;
    if (target.matches('#form2-phone')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#form2-name')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    } else
    if (target.matches('#form2-message')) {
      target.value = target.value.replace(/[^?!,.а-яё\s]/gi, '');
    }
  };

  const checkForm3 = (event) => {
    let target = event.target;
    if (target.matches('#form3-phone')) {
      target.value = target.value.replace(/(?<!^)\+|[^\d+]/g, '');
    } else
    if (target.matches('#form3-name')) {
      target.value = target.value.replace(/[^а-яё\s]/gi, '');
    }
  };

  // Обработчики событий корректного ввода данных в форму
  form.addEventListener('change', checkForm1);
  form2.addEventListener('change', checkForm2);
  form3.addEventListener('change', checkForm3);
  
  // Функция очистки подписи под формой
  const updateForm = () => {
    statusMessage.textContent = '';
    statusMessage.textContent = '';
  };

  
  // Функция очистки формы1
  const clearForm1 = () => {  
    const form1Name = document.getElementById('form1-name'),
          form1Email = document.getElementById('form1-email'),
          form1Phone = document.getElementById('form1-phone');
    form1Name.value = '';
    form1Email.value = '';
    form1Phone.value = '';
  };
  // Форма1
  form.addEventListener('submit', (event) => {            
    event.preventDefault();
    form.appendChild(statusMessage);      
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    let body = {};
    formData.forEach((val, key) => {
      body[key] = val;
    });
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        clearForm1();
        setTimeout(updateForm, 5000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearForm1();
        setTimeout(updateForm, 5000);
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
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        clearForm2();
        setTimeout(updateForm, 5000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearForm2();
        setTimeout(updateForm, 5000);
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
    postData(body)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('status network not 200');
        }
        statusMessage.textContent = successMessage;
        clearForm3();
        setTimeout(updateForm, 5000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = errorMessage;
        clearForm3();
        setTimeout(updateForm, 5000);
      });
  });

  const postData = (body) => {
    return fetch('./server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
  };

};

export default sendForm;