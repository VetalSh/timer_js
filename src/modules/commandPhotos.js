const commandPhotos = () => {
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
};

export default commandPhotos;