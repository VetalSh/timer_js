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

    if (target.matches('select') || target.matches('input')) {
      countSum();
    }

  });
};

export default calc;