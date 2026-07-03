// общий скрипт меню для всех страниц сайта
$(document).ready(() => {

  // гамбургер-меню для мобильных
  $('#hamburger').on('click', () => {
    $('header ul').toggleClass('responsive');
  });

  // точки-переключатели в секции отзывов
  const dots = document.querySelectorAll('.control-item');
  const cards = document.querySelectorAll('.testimonials-card');
  const inner = document.querySelector('.testimonials-inner');

  if (dots.length && cards.length && inner) {
    // карты которые соответствуют каждой точке (3 точки = 3 группы из 5 карточек)
    const cardMap = [0, 2, 4];

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        // переключаем активную точку
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        const card = cards[cardMap[i]];
        if (!card) return;

        if (window.innerWidth <= 576) {
          // на мобильном карточки вертикальные — скроллим страницу
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // на десктопе карточки горизонтальные — скроллим контейнер
          inner.scrollTo({
            left: card.offsetLeft - inner.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
    });

    // автоматически обновляем активную точку при горизонтальном скролле
    inner.addEventListener('scroll', () => {
      if (window.innerWidth <= 576) return;
      let closest = 0;
      let minDist = Infinity;
      cardMap.forEach((ci, i) => {
        const card = cards[ci];
        if (!card) return;
        const dist = Math.abs(card.offsetLeft - inner.offsetLeft - inner.scrollLeft);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      dots.forEach(d => d.classList.remove('active'));
      if (dots[closest]) dots[closest].classList.add('active');
    });
  }

  // плавный переход по ссылкам меню (только если есть data-link и якорь есть на ЭТОЙ странице)
  const menuList = document.querySelectorAll('.menu-element, header nav a, footer nav a');

  menuList.forEach(function (element) {
    element.addEventListener('click', function (event) {
      const elementLink = element.dataset.link;

      if (elementLink && document.getElementById(elementLink)) {
        event.preventDefault();
        document.getElementById(elementLink).scrollIntoView({ behavior: 'smooth' });
        $('header ul').removeClass('responsive');
      }
    });
  });

});
