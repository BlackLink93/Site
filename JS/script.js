// общий скрипт меню для всех страниц сайта
$(document).ready(() => {

  // гамбургер-меню для мобильных
  $('#hamburger').on('click', () => {
    $('header ul').toggleClass('responsive');
  });

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
