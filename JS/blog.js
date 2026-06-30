// данные записей блога (имитация ответа сервера в формате JSON)
const jsonData = '[' +
  '{"image": "blog01.jpg", "title": "Новый турнир по CS2", "text": "На следующих выходных в клубе пройдёт открытый турнир по CS2 с призовым фондом. Регистрация команд уже открыта на ресепшене клуба.", "date": "3 дня назад", "tags": ["турниры", "cs2", "новости"]},' +
  '{"image": "blog02.jpg", "title": "Обновили VR-зону", "text": "Мы добавили два новых шлема виртуальной реальности последнего поколения и расширили площадь VR-зоны для более комфортной игры.", "date": "1 неделю назад", "tags": ["vr", "оборудование", "новости"]},' +
  '{"image": "blog03.jpg", "title": "Как забронировать ПК онлайн", "text": "Рассказываем, как быстро забронировать игровой ПК через сайт или по телефону и не стоять в очереди в выходные.", "date": "2 недели назад", "tags": ["гайд", "бронирование"]},' +
  '{"image": "blog04.jpg", "title": "Итоги турнира по Dota 2", "text": "Подвели итоги недавнего турнира по Dota 2: лучшая команда, лучший игрок и розыгрыш призов среди зрителей.", "date": "3 недели назад", "tags": ["турниры", "dota2", "итоги"]}' +
  ']';

// шаблон карточки записи блога
const cardHtml = '<section class="blog-card">' +
  '<div class="blog-header"><div class="blog-cover"></div></div>' +
  '<div class="blog-body">' +
  '<div class="blog-title"><h2></h2></div>' +
  '<div class="blog-text"><p></p></div>' +
  '<div class="blog-tags"><ul></ul></div>' +
  '<div class="blog-footer"><div class="blog-published-date"></div></div>' +
  '</div>' +
  '</section>';

// ожидаем загрузки документа
$(document).ready(() => {
  const data = JSON.parse(jsonData);
  drawCards(data);

  // поиск по кнопке
  $('.search-do').on('click', () => {
    const search = $('.search-text').val().toLowerCase();
    filter(search, data);
  });

  // поиск по Enter
  $('.search-text').on('keypress', (e) => {
    if (e.which === 13) {
      const search = $('.search-text').val().toLowerCase();
      filter(search, data);
    }
  });

  initCardsHandler();
});

// рисует записи блога согласно входной информации
function drawCards(data) {
  $('.blog-container').html('');

  if (!data.length) {
    $('.blog-container').html('<p class="blog-empty">По вашему запросу ничего не найдено</p>');
    return;
  }

  data.forEach((item) => {
    let card = $(cardHtml);
    card.find('.blog-cover').css('background-image', 'url("Img/blog/' + item.image + '")');
    card.find('.blog-title h2').text(item.title);
    card.find('.blog-text p').text(item.text);
    card.find('.blog-published-date').text(item.date);

    let tags = '';
    item.tags.forEach((tag) => {
      tags += '<li><a href="#">' + tag + '</a></li>';
    });
    card.find('.blog-tags ul').html(tags);

    $('.blog-container').append(card);
  });

  initCardsHandler();
}

// фильтруем исходный объект по условию
function filter(value, data) {
  const newData = data.filter((item) => {
    let result = 0;
    result += item.title.toLowerCase().indexOf(value) > -1;
    result += item.text.toLowerCase().indexOf(value) > -1;
    result += item.tags.filter((tag) => tag.toLowerCase().indexOf(value) > -1).length;
    return result > 0;
  });
  drawCards(newData);
}

// инициатор кликов по тегам (назначаем заново после каждой перерисовки)
function initCardsHandler() {
  const data = JSON.parse(jsonData);
  $('.blog-tags a').off().on('click', (e) => {
    e.preventDefault();
    const search = $(e.currentTarget).text().toLowerCase();
    $('.search-text').val(search);
    filter(search, data);
  });
}
